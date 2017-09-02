const request = require('request-promise');
const logger = require('../dist/logger').default;
const url = 'http://www.gidsnl.nl/v.html';
const Club = require('../dist/api/club/club.model').default;
const Sport = require('../dist/api/sport/sport.model').default;
const Country = require('../dist/api/country/country.model').default;

const knownTypes = [
  'afc', 'asv', 'avc', 'avv', 'av en ac',
  'bsv', 'bvv',
  'csc', 'csv', 'cvv', 'c en fc', 
  'dfc', 'dsc', 'dsv', 'dvc', 'dvv', 
  'evv',
  'fc',
  'gsv', 'gv', 
  'hcsc', 'hfc', 'hsc', 'hsv', 'hvv', 
  'ijvv',
  'kon', 'ks', 'ksv',
  'lac', 'lvv', 
  'msv', 'mvv',
  'osv', 'ov', 
  'psv', 
  'rksv', 'rkvv', 'rsav', 'rsc', 'rvv', 'rk vv', 
  'sbv', 'sc', 'sf', 'sjo', 'sp', 'ssa', 'stichting', 'sv',
  'ucs', 'usv', 'uvv',
  'vbv', 'vc', 'vv', 'v en av',
  'wvv', 
  'zsv', 'zmvv', 'zvv', 
];

function getName(string) {
  if (string.indexOf(' ') === -1) {
    return string;
  }
  const tokens = string.split(' ');
  if (knownTypes.indexOf(tokens[0]) > -1) {
    return string.replace(/^\S+ /, '');
  }
  return string;
}

function getType(string) {
  if (string.indexOf(' ') === -1) {
    return '';
  }
  const tokens = string.split(' ');
  if (knownTypes.indexOf(tokens[0]) > -1) {
    return tokens[0];
  }
  return '';
}

function getFootballClubData(url) {
  console.log('Reading from %s', url);
  return request.get(url)
  .then(res => {
    // Each line is like this:
    // <tr>
    //   <th>sv De Valleivogels
    //     <br><a href=http://www.valleivogels.nl/ target=new><img alt='Website Valleivogels' src=hpg.gif></a>
    //     <br>Oost veld<br>01aug1947
    //   </th>
    //   <td>Sportpark De Bree West: Willaerlaan 123<br>3925HM Scherpenzeel Gld (Postbus 10, 3925ZG)</td>
    //   <td>033-2772773<a href="javascript:GMAPS('Valleivogels+sv+De+-+Scherpenzeel+Gld','5.48429','52.08540')">
    //     <img src=loc.gif alt='Google Maps'></a><br>secretaris&#64;valleivogels.nl<br>Kleur shirt: Wit met Rood
    //     <br>KNVB: BBCC73H
    //   </td>
    // </tr>
    
    let count = 0;
    let failcount = 0;
    let clubs = [];
    res.split(/\n/).forEach(line => {
      // let m = line.match('^<tr><th>(.*)<br><a.*</th><td>(.*)<br>(\d\d\d\d[A-Z][A-Z]) (\w*) \(');
      let m = line.match('^<tr><th>(.*)<br><a.*</th><td>([^:]+): ([^<]*)<br>([0-9]{4} ?[A-Z]{2}) ([^(]+) ');
      let m2 = line.match('^<tr><th>');
      if (m) {
        count++;
        const data = {
          name: getName(m[1]),
          type: getType(m[1]),
          park_name: m[2],
          address: m[3],
          postal_code: m[4],
          city: m[5],
        };
        clubs.push(data);
        // console.log('name=%s park=%s street=%s pc=%s city=%s', m[1], m[2], m[3], m[4], m[5]);
      }
      if (m2 && !m) {
        failcount++;
        console.warn('fail: %s', line);
      }
    });
    console.log('num: %s; failed: %s', count, failcount);
    return clubs;
  });
}

const alphabet = 'abcdefghijklmnopqrstuvwxyz';
let allClubs = [];
let countryNl, sportFootball;

let lastPromise = alphabet.split('').reduce((prev, letter) => {
  return prev.then(() => {
    const url = 'http://www.gidsnl.nl/' + letter + '.html';
    return getFootballClubData(url)
    .then(clubs => {
      clubs.forEach(c => { allClubs.push(c); });
    });
  })
}, Promise.resolve());

lastPromise.then(res => {
  console.log('Done. num clubs: %s', allClubs.length);

  return Country.where('code', 'nl').fetch();
})
.then(c => {
  countryNl = c;
  return Sport.where('name', 'football').fetch();
})
.then(s => {
  sportFootball = s;

  return Club
        .where('country_id', countryNl.id)
        .where('sport_id', sportFootball.id)
        .get();
})
.then(c => {
  dbClubs = c;
  console.log('num clubs in db: %s', dbClubs.length);

  let lastPromise = allClubs.reduce((prev, clubData) => {
      logger.info({ d: clubData }, 'Creating club');
    let existingClub = dbClubs.findWhere({ name: clubData.name });
    if (existingClub) {
      console.log('Club "%s" already exists in the db.', clubData.name);
      return Promise.resolve();
    }
    else {
      clubData.country_id = countryNl.id;
      clubData.sport_id = sportFootball.id;
      let newClub = new Club(clubData);
      return newClub.save();
    }
  });
})
.then(() => {
  setTimeout(process.exit, 5000);
})
.catch(err => {
  console.error(err);
});


