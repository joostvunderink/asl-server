import { createValidationTestData } from '../../helper/validation';

const validCreateInputs = [
  {
    name: 'Football, NL, East',
    data: {
      name: 'East',
      description: 'East region of NL football',
      country_id: 1,
      sport_id: 1,
    },
  },
];

const invalidCreateInputs = [
  {
    name: 'Name empty',
    data: { name: '' },
  },
];

const validUpdateInputs = [
  {
    name: 'Update the name',
    data: { name: 'Changed name' }
  },
  {
    name: 'Update the description',
    data: { description: 'Changed description' }
  },
];

const invalidUpdateInputs = [
  {
    name: 'Description empty',
    data: { 'description': '' },
  },
  {
    name: 'Description null',
    data: { 'description': null },
  },
  {
    name: 'Name empty',
    data: { 'name': '' },
  },
  {
    name: 'Name empty',
    data: { 'name': null },
  },
  {
    name: 'Invalid extra field',
    data: { 'invalid': 'anything' },
  },
];

export const testData = createValidationTestData({
  route              : 'regions',
  validCreateInputs  : validCreateInputs,
  validUpdateInputs  : validUpdateInputs,
  invalidCreateInputs: invalidCreateInputs,
  invalidUpdateInputs: invalidUpdateInputs,
  existingObjectId   : 1,
  updateObjectId     : 4242,
});
