const xlsx = require('xlsx');
import logger from '../logger';
import * as moment from 'moment';
import * as fs from 'fs';
import * as request from 'request-promise';
import { DataIntegrityError } from '../error';

const clogger = logger.child({ section: 'import' });

import Country              from '../api/country/country.model';
import Sport                from '../api/sport/sport.model';
import Region               from '../api/region/region.model';
import Season               from '../api/season/season.model';
import Competition          from '../api/competition/competition.model';
import CompetitionTemplate  from '../api/competition-template/competition-template.model';
import CompetitionTeam      from '../api/competition-team/competition-team.model';
import CompetitionRound     from '../api/competition-round/competition-round.model';
import CompetitionMatch     from '../api/competition-match/competition-match.model';
import Club                 from '../api/club/club.model';

const playDayMap = {
  'zaterdag': 6,
  'zondag': 0,
};

function getCompetitionInfo(infoSheet) {
  return {
    name      : infoSheet['B2'].v,
    regionName: infoSheet['B3'].v,
    playDay   : infoSheet['B4'].v.toLowerCase(),
    season    : infoSheet['B5'].v,
  };
}

function getTeams(teamSheet) {
  let teamInfo = {};
  for (let i = 1; i < 15; i++) {
    teamInfo[i] = teamSheet['B' + (i+1)].v;
  }
  return teamInfo;
}

function getRounds(roundSheet) {
  let rounds = [];
  let i = 1;
  while (roundSheet['A' + (i+1)]) {
    const roundInfo = {
      number: roundSheet['A' + (i+1)].v,
      date  : moment(roundSheet['B' + (i+1)].w, 'MM/DD/YY').toDate(),
      time  : roundSheet['C' + (i+1)].w,
      period: roundSheet['D' + (i+1)].v,
    };
    rounds.push(roundInfo);
    i++;
  }
  return rounds;
}

// Returns
// [
//   matches: [
//     {
//       round: 1,
//       home_team_number: 1
//       away_team_number: 2
//     },  
//     ...
//   ]
// ]
function getMatches(matchSheet) {
  let matches = [];
  let i = 1; // Row number. We skip row 0, which is the header.

  // Continue until there are 3 empty rows in a row.
  while (matchSheet['A' + (i+1)] || matchSheet['A' + (i+2)] || matchSheet['A' + (i+3)]) {
    // Ignore empty rows.
    if (matchSheet['A' + (i+1)]) {
      const matchInfo = {
        round : matchSheet['A' + (i+1)].v,
        home_team_number  : matchSheet['C' + (i+1)].v,
        away_team_number  : matchSheet['D' + (i+1)].v,
      };
      matches.push(matchInfo);
    }
    i++;
  }
  return matches;
}

async function findOrCreateCompetition(args) {
  let { clogger, dbo } = args;
  clogger.debug('Looking up existing competition');
  let competition = await Competition.where('competition_template_id', dbo.competitionTemplate.id)
                                     .where('season_id', dbo.season.id)
                                     .fetch();

  if (!competition) {
    clogger.debug('Competition not found; creating.');
    competition = new Competition({
      competition_template_id: dbo.competitionTemplate.id,
      season_id: dbo.season.id,
    })
    competition = await competition.save();
    clogger.info({
      id                     : competition.id,
      competition_template_id: competition.competition_template_id,
      season_id              : competition.season_id,
    }, 'Created competition');
  }

  return competition;
}

async function createCompetitionTeam(args) {
  let { clogger, teamName, clubName, dbo } = args;

  let club = await Club.where('country_id', dbo.country.id)
                       .where('sport_id', dbo.sport.id)
                       .where('name', clubName)
                       .fetch();
  if (!club) {
    throw new DataIntegrityError({
      message: 'Cannot import competition because club ' + clubName + ' does not exist for sport ' +
      dbo.sport.get('name') + ' in country ' + dbo.country.get('name'),
      data: {
        sport_name: dbo.sport.get('name'),
        sport_id: dbo.sport.id,
        country_name: dbo.country.get('name'),
        country_id: dbo.country.id,
        club_name: clubName,
      },
    });
  }

  let competitionTeam = new CompetitionTeam({
    competition_id: dbo.competition.id,
    club_id       : club.id,
    name          : teamName,
  });

  await competitionTeam.save();
  logger.info({
    id       : competitionTeam.id,
    team_name: teamName,
    club_name: club.name,
  }, 'Created competition_team');
  return competitionTeam;
}

async function findOrCreateCompetitionTeams(args) {
  let { clogger, teamsData, dbo } = args;

  let competitionTeams = await CompetitionTeam.where('competition_id', dbo.competition.id).get();

  dbo.competitionTeamMap = {};

  for (const teamNum in teamsData) {
    const teamName = teamsData[teamNum];
    let competitionTeam = competitionTeams.findWhere({ name: teamName });
    if (competitionTeam) {
      clogger.debug({ ct_id: competitionTeam.id, teamName }, 'competition-team already exists');
      dbo.competitionTeamMap[teamNum] = competitionTeam;
    }
    else {
      clogger.debug({ teamName }, 'competition-team does not exist; creating new');
      const newCompetitionTeam = await createCompetitionTeam({ clogger, dbo, teamName, clubName: teamName });
      dbo.competitionTeamMap[teamNum] = newCompetitionTeam;
      competitionTeams.add(newCompetitionTeam);
    }
  }
  return competitionTeams;
}

async function findOrCreateCompetitionRounds(args) {
  const { clogger, dbo, roundsData } = args;

  let competitionRounds = await CompetitionRound.where('competition_id', dbo.competition.id).get();
  dbo.competitionRoundMap = {};

  for (const roundData of roundsData) {
    let competitionRound = competitionRounds.findWhere({ round: roundData.number });
    if (competitionRound) {
      clogger.debug({ cr_id: competitionRound.id, cr_num: roundData.number }, 'competition-round already exists');
      dbo.competitionRoundMap[roundData.number] = competitionRound;
    }
    else {
      clogger.debug({ round_number: roundData.number, round_date: roundData.date },
        'competition-round does not exist; creating new');
      const newCompetitionRound = new CompetitionRound({
        competition_id: dbo.competition.id,
        round: roundData.number,
        round_date: roundData.date,
      });
      await newCompetitionRound.save();
      competitionRounds.add(newCompetitionRound);
      clogger.info({
        id          : newCompetitionRound.id,
        round_number: newCompetitionRound.round,
        round_date  : newCompetitionRound.round_date,
      }, 'Created competition_round');
      dbo.competitionRoundMap[roundData.number] = newCompetitionRound;
    }
  }
  return competitionRounds;
}

async function findOrCreateCompetitionMatches(args) {
  const { clogger, dbo, matchesData } = args;
  let competitionMatches = await CompetitionMatch.where('competition_id', dbo.competition.id).get();

  for (const matchData of matchesData) {
    const homeTeamId = dbo.competitionTeamMap[matchData.home_team_number].id;
    const awayTeamId = dbo.competitionTeamMap[matchData.away_team_number].id;
    const competitionRoundId = dbo.competitionRoundMap[matchData.round].id;
    let competitionMatch = await competitionMatches.findWhere({
      competition_round_id: competitionRoundId,
      home_team_id: homeTeamId,
      away_team_id: awayTeamId,
    });

    if (competitionMatch) {
      clogger.debug({ cm_id: competitionMatch.id }, 'competition_match already exists');
    }
    else {
      clogger.debug({
        round_id: competitionRoundId,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
      }, 'competition_match does not exist; creating new');
      const newCompetitionMatch = new CompetitionMatch({
        competition_id: dbo.competition.id,
        competition_round_id: competitionRoundId,
        home_team_id: homeTeamId,
        away_team_id: awayTeamId,
      });
      await newCompetitionMatch.save();
      logger.info({
        id: newCompetitionMatch.id,
        competition_id      : newCompetitionMatch.competition_id,
        competition_round_id: newCompetitionMatch.competition_round_id,
        home_team_id        : newCompetitionMatch.home_team_id,
        away_team_id        : newCompetitionMatch.away_team_id,
      }, 'Created competition_match');
      competitionMatches.add(newCompetitionMatch);
    }
  }

  return competitionMatches;
}

export async function importCompetition(args) {
  let { sport, country, url } = args;

  logger.debug('Importing competition')
  let tmpFilename = '/tmp/competition.import.tmp.' + process.pid + '.xlsx';

  if (sport === 'football' && country === 'nl') {
    logger.debug({ url }, 'Downloading competition document to import')
    return request.get({
      url: url,
      encoding: null,
    })
    .then(res => {
      logger.debug({ tmpFilename, len: res.length }, 'Writing data to temp file');
      const buffer = Buffer.from(res, 'utf8');
      fs.writeFileSync(tmpFilename, buffer);
      return importCompetitionNlFootball(tmpFilename);
    })
    .catch(err => {
      logger.error(err);
      return Promise.reject(err);
    });
  }
  else {
    return Promise.resolve();
  }
}

export async function importCompetitionNlFootball(filename) {
  clogger.debug({ filename }, 'Importing competition');
  // let workbook = xlsx.readFile(filename, { cellDates: true });
  let workbook   = xlsx.readFile(filename, { cellDates: false });
  let infoSheet  = workbook.Sheets[workbook.SheetNames[0]];
  let teamSheet  = workbook.Sheets[workbook.SheetNames[1]];
  let roundSheet = workbook.Sheets[workbook.SheetNames[2]];
  let matchSheet = workbook.Sheets[workbook.SheetNames[3]];

  const info = {
    competition: getCompetitionInfo(infoSheet),
    teams: getTeams(teamSheet),
    rounds: getRounds(roundSheet),
    matches: getMatches(matchSheet),
  };

  let dbo: any = {
    country: await Country.where('code', 'nl').fetch(),
    sport: await Sport.where('name', 'football').fetch(),
  };

  if (!dbo.country) {
    throw new DataIntegrityError({
      message: 'Cannot import competition because country "nl" could not be found',
      data: {
        country_name: 'nl',
      },
    });
  }

  if (!dbo.sport) {
    throw new DataIntegrityError({
      message: 'Cannot import competition because sport "football" could not be found',
      data: {
        sport_name: 'football',
      },
    });
  }

  clogger.debug({
    region_name: info.competition.regionName,
    sport_id: dbo.sport.id,
    country_id: dbo.country.id,
  }, 'Looking up region');
  dbo.region = await Region.where('country_id', dbo.country.id).where('sport_id', dbo.sport.id).where('name', info.competition.regionName).fetch();

  if (!dbo.region) {
    throw new DataIntegrityError({
      message: 'Cannot import competition because region "' + info.competition.regionName + '" does not exist for sport ' +
      dbo.sport.get('name') + ' in country ' + dbo.country.get('name'),
      data: {
        sport_name: dbo.sport.get('name'),
        sport_id: dbo.sport.id,
        country_name: dbo.country.get('name'),
        country_id: dbo.country.id,
        region_name: info.competition.regionName,
      },
    });
  }

  clogger.debug({ season_name: info.competition.season }, 'Looking up season');
  dbo.season = await Season.where('region_id', dbo.region.id).where('name', info.competition.season).fetch();

  if (!dbo.season) {
    throw new DataIntegrityError({
      message: 'Cannot import competition because season "' + info.competition.season + '" does not exist for region ' +
      dbo.region.get('name') + ' in country ' + dbo.country.get('name'),
      data: {
        sport_name: dbo.sport.get('name'),
        sport_id: dbo.sport.id,
        country_name: dbo.country.get('name'),
        country_id: dbo.country.id,
        region_name: info.competition.regionName,
        season_name: info.competition.season,
      },
    });
  }

  clogger.debug({
    competition_name: info.competition.name,
    play_day_name: info.competition.playDay,
    play_day_num: playDayMap[info.competition.playDay],
  }, 'Looking up competition template');
  dbo.competitionTemplate = await CompetitionTemplate.where('region_id', dbo.region.id)
                                                     .where('play_day', playDayMap[info.competition.playDay])
                                                     .where('name', info.competition.name)
                                                     .fetch();

  if (!dbo.competitionTemplate) {
    throw new DataIntegrityError({
      message: 'Cannot import competition because competition template for "' + info.competition.name + 
        '" for playday ' + info.competition.playDay + ' does not exist for region ' +
      dbo.region.get('name') + ' in country ' + dbo.country.get('name'),
      data: {
        sport_name: dbo.sport.get('name'),
        sport_id: dbo.sport.id,
        country_name: dbo.country.get('name'),
        country_id: dbo.country.id,
        region_name: info.competition.regionName,
        competition_name: info.competition.name,
        playday: playDayMap[info.competition.playDay]
      },
    });
  }

  dbo.competition = await findOrCreateCompetition({ clogger, dbo });
  dbo.competitionTeams = await findOrCreateCompetitionTeams({ clogger, dbo, teamsData: info.teams });
  dbo.competitionRounds = await findOrCreateCompetitionRounds({ clogger, dbo, roundsData: info.rounds });
  dbo.competitionMatches = await findOrCreateCompetitionMatches({ clogger, dbo, matchesData: info.matches });

  return dbo;
}

