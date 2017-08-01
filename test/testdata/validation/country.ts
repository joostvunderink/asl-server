import { createValidationTestData } from '../../helper/validation';

const validCreateInputs = [
  {
    name: 'Single country - Monaco',
    data: { code: 'mo', name: 'Monaco' }
  },
];

const invalidCreateInputs = [
  {
    name: 'Country code too long',
    data: { 'code': 'banana country' },
  },
  {
    name: 'Country code contains invalid characters',
    data: { 'code': 'a!' },
  },
  {
    name: 'Country code empty',
    data: { 'code': '' },
  },
  {
    name: 'Country code not given',
    data: { 'code': undefined },
  },
  {
    name: 'Country name empty',
    data: { 'name': '' },
  },
  {
    name: 'Country name not given',
    data: { 'name': undefined },
  },
  {
    name: 'Invalid extra field',
    data: { 'invalid': 'anything' },
  },
];

const validUpdateInputs = [
  {
    name: 'Update the name',
    data: { name: 'Changed name' }
  },
  {
    name: 'Update the code',
    data: { code: 'ux' }
  },
];

const invalidUpdateInputs = [
  {
    name: 'Country code too long',
    data: { 'code': 'banana country' },
  },
  {
    name: 'Country code contains invalid characters',
    data: { 'code': 'a!' },
  },
  {
    name: 'Country code empty',
    data: { 'code': '' },
  },
  {
    name: 'Country code null',
    data: { 'code': null },
  },
  {
    name: 'Country name empty',
    data: { 'name': '' },
  },
  {
    name: 'Country name empty',
    data: { 'name': null },
  },
  {
    name: 'Invalid extra field',
    data: { 'invalid': 'anything' },
  },
];

export const testData = createValidationTestData({
  route              : 'countries',
  validCreateInputs  : validCreateInputs,
  validUpdateInputs  : validUpdateInputs,
  invalidCreateInputs: invalidCreateInputs,
  invalidUpdateInputs: invalidUpdateInputs,
  existingObjectId   : 1,
  updateObjectId     : 4242,
});
