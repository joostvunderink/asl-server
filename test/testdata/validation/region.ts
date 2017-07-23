export const testData = {
  route: 'regions',
  validInputs: [
    {
      name: 'Football, NL, East',
      data: {
        name: 'East',
        description: 'East region of NL football',
        country_id: 1,
        sport_id: 1,
      },
    }
  ],
  invalidInputs: [
    {
      name: 'Region name empty',
      data: {
        name: '',
        description: 'Region without name',
        country_id: 1,
        sport_id: 1,
      },
    },
  ]
};
