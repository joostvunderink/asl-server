export const testData = {
  route: 'countries',
  duplicateCreateTests: [
    {
      name: 'Duplicate country name',
      init: {
        code: 'xx',
        name: 'Duplication Country 1',
      },
      data: {
        code: 'xy',
        name: 'Duplication Country 1',
      },
    },
    {
      name: 'Duplicate country code',
      init: {
        code: 'ya',
        name: 'Duplication Country 2',
      },
      data: {
        code: 'ya',
        name: 'Duplication Country 3',
      },
    },
  ]
};
