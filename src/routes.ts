import ClubRouter                from './api/club/club.router';
import CompetitionRouter         from './api/competition/competition.router';
import CompetitionTeamRouter     from './api/competition-team/competition-team.router';
import CompetitionTemplateRouter from './api/competition-template/competition-template.router';
import CountryRouter             from './api/country/country.router';
import PersonRouter              from './api/person/person.router';
import RegionRouter              from './api/region/region.router';
import SeasonRouter              from './api/season/season.router';
import SportRouter               from './api/sport/sport.router';
import TeamRouter                from './api/team/team.router';


export default function getRouteConfig() {
  return {
    'clubs'                : ClubRouter,
    'competitions'         : CompetitionRouter,
    'competition-team'     : CompetitionTeamRouter,
    'competition-templates': CompetitionTemplateRouter,
    'countries'            : CountryRouter,
    'persons'              : PersonRouter,
    'regions'              : RegionRouter,
    'seasons'              : SeasonRouter,
    'sports'               : SportRouter,
    'teams'                : TeamRouter,
  };
}
