console.log(process.cwd());
const { knex, bookshelf, defaultTableDef } = require('../dist/db');

if (process.env.NODE_ENV !== 'development') {
  console.log('NODE_ENV is not "development". Not adding bootstrap data.');
  process.exit(0);
}

const dataToAdd = [
  {
    tableName: 'oauth_client',
    identifyingField: 'client_id',
    records: [
      {
        'client_id': 'asl-crm',
        'client_secret': '7pH0W2X0M1OULdoOu6S6vATCIUlFCRE9FX3RYdPS',
        'redirect_url': 'http://localhost:4200/home',
        'grants': '[\"password\",\"authorization_code\"]',
      }
    ]
  },
  {
    tableName: 'user',
    identifyingField: 'uuid',
    records: [
      {
        uuid: '3a94ec6b-f6f5-4060-b61a-6d8f18605cb1',
        email: 'admin@asl',
        password: '$2a$10$OdSai7uiNEPvGGcJxZcAMuw4ABn0Myjvjd2wA2ORSdEQllDgW7JoG',
      }
    ]
  },
];
function updateTable(tableData) {
  return knex(tableData.tableName)
  .then(records => {
    console.log('Updating table %s - adding %s record(s).', tableData.tableName, tableData.records.length);
    console.log('  Current number of records in the table: %s', records.length);
    let promises = [];
    tableData.records.forEach(newRecord => {
      const currentRecord = records.find(record => {
        return record[tableData.identifyingField] === newRecord[tableData.identifyingField];
      });
      if (currentRecord) {
        console.log('  Record with %s %s already present', tableData.identifyingField, newRecord[tableData.identifyingField]);
      } else {
        console.log('  Adding record with %s %s', tableData.identifyingField, newRecord[tableData.identifyingField]);
        console.log(newRecord);
        promises.push(knex(tableData.tableName).insert(newRecord).then(() => { return true; }));
      }
    });
    console.log('  Number of records being added: %s', promises.length);
    return promises;
  });
}

console.log('Bootstrap data - starting.')

const promises = dataToAdd.map(tableData => {
  return updateTable(tableData);
});

const lastPromise = promises.reduce((prev, cur) => {
  return prev.then(() => {
    return cur;
  });
});

lastPromise.then(() => {
  console.log('Bootstrap data - all done.');
  setTimeout(knex.destroy, 0);
})
.catch(err => {
  console.error(err);
});
