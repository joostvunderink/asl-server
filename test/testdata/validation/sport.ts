export const testData = {
  route: 'sports',
  validInputs: [
    {
      name: 'Curling',
      data: {
        name: 'Curling',
      },
    }
  ],
  invalidInputs: [
    {
      name: 'Sport name empty',
      data: {
        name: '',
      },
    },
    {
      name: 'Sport name not given',
      data: {
      },
    },
    {
      name: 'Invalid extra field',
      data: {
        name: 'Correct sport name',
        invalid_field: 'whatever',
      },
    },
  ]
};
