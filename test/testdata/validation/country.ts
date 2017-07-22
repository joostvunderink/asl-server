export const testData = {
  route: 'countries',
  validInputs: [
    {
      name: 'Monaco',
      data: {
        code: 'mo',
        name: 'Monaco',
      },
    }
  ],
  invalidInputs: [
    {
      name: 'Country code too long',
      data: {
        code: 'banana',
        name: 'Banana Country',
      },
    },
    {
      name: 'Country code empty',
      data: {
        code: '',
        name: 'Empty Country Code',
      },
    },
    {
      name: 'Country code not given',
      data: {
        name: 'Empty Country Code',
      },
    },
    {
      name: 'Country name empty',
      data: {
        code: 'xz',
        name: '',
      },
    },
    {
      name: 'Country name not given',
      data: {
        code: 'xz',
      },
    },
    {
      name: 'Invalid extra field',
      data: {
        code: 'xz',
        name: 'XZ country',
        invalid_field: 'whatever',
      },
    },
  ]
};
