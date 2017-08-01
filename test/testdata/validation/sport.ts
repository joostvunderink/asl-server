import { createValidationTestData } from '../../helper/validation';

const validCreateInputs = [
  {
    name: 'Curling',
    data: {
      name: 'Curling',
      description: 'Throwing things across ice'
    },
  },
];

const invalidCreateInputs = [
  {
    name: 'Name empty',
    data: { name: '' },
  },
  {
    name: 'Name not given',
    data: { name: undefined },
  },
  {
    name: 'Description empty',
    data: { description: '' },
  },
  {
    name: 'Description not given',
    data: { description: undefined },
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
  route              : 'sports',
  validCreateInputs  : validCreateInputs,
  validUpdateInputs  : validUpdateInputs,
  invalidCreateInputs: invalidCreateInputs,
  invalidUpdateInputs: invalidUpdateInputs,
  existingObjectId   : 1,
  updateObjectId     : 4242,
});
