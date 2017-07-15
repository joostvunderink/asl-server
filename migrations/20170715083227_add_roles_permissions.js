const roles = [
  { name: 'admin', },
  { name: 'user', },
  { name: 'guest', },
];

let roleOperations = [
];

function addCrud(role, model) {
  const crud = ['create', 'read', 'update', 'delete'];
  crud.forEach(o => {
    roleOperations.push({ role: role, operation: o, model: model })
  });
}

const allModels = [
  'club',
  'competition',
  'competition_match',
  'competition_round',
  'competition_team',
  'competition_template',
  'country',
  'person',
  'region',
  'season',
  'sport',
  'team',
  // The 'user' model is special: users shouldn't be able to read all rows,
  // only their own.
];

allModels.forEach(model => {
  addCrud('admin', model);
});
addCrud('admin', 'user');
allModels.forEach(model => {
  roleOperations.push({ role: 'user', operation: 'read', model: model });
});
allModels.forEach(model => {
  roleOperations.push({ role: 'guest', operation: 'read', model: model });
});

exports.up = function(knex) {
  return knex('role').insert(roles)
  .then(() => {
    return knex('role').whereIn('name', roles.map(role => role.name));
  })
  .then(res => {
    let roleIdMap = {};
    res.forEach(row => { roleIdMap[row.name] = row.id });
    roleOperations.map(ro => {
      ro.role_id = roleIdMap[ro.role];
      delete ro.role;
    });
    return knex('role_operation').insert(roleOperations);
  })
};

exports.down = function(knex) {
  return knex('role').whereIn('name', roles.map(role => role.name))
  .then(res => {
    let roleIds = res.map(row => row.id);
    return knex('role_operation').whereIn('role_id', roleIds).del();
  })
  .then(() => {
    return Promise.all(roles.map(role => {
      return knex('role').where('name', role.name).del()
    }));
  });
};
