export const testData = {
  route: 'regions',
  createTests: [
    {
      name: 'Create region with invalid country_id',
      init: [],
      data: {
        name: 'Region with invalid country_id',
        sport_id: 1,
        country_id: 12345,
      },
    },
    {
      name: 'Create region with invalid sport_id',
      init: [],
      data: {
        name: 'Region with invalid sport_id',
        sport_id: 12345,
        country_id: 1,
      },
    },
  ],
  updateTests: [
    {
      name: 'Update region with invalid country_id',
      init: [],
      test: {
        route: 'regions',
        operation: 'patch',
        data: {
          name: 'Region with invalid country_id',
          sport_id: 1,
          country_id: 12345,
        },
      }
    },
    {
      name: 'Create region with invalid sport_id',
      init: [],
      data: {
        name: 'Region with invalid sport_id',
        sport_id: 12345,
        country_id: 1,
      },
    },
  ]
};
