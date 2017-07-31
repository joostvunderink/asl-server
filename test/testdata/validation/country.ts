const validCreateInputs = [
  {
    name: 'Single country - Monaco',
    data: {
      code: 'mo',
      name: 'Monaco',
    }
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
    data: {
      name: 'Changed name',
    }
  },
  {
    name: 'Update the code',
    data: {
      code: 'ux',
    }
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

export const testData = createTestData({
  route              : 'countries',
  validCreateInputs  : validCreateInputs,
  validUpdateInputs  : validUpdateInputs,
  invalidCreateInputs: invalidCreateInputs,
  invalidUpdateInputs: invalidUpdateInputs,
  existingObjectId   : 1,
  updateObjectId     : 4242,
});

function createTestData({
  route, existingObjectId, updateObjectId,
  validCreateInputs, invalidCreateInputs,
  validUpdateInputs, invalidUpdateInputs,
}) {
  let testData = {
    route: route,
    okTests: [],
    errorTests: []
  };

  // Create POST test for creating objects with valid input
  validCreateInputs.forEach(vi => {
    testData.okTests.push({
      name: vi.name,
      before: [],
      input: {
        method: 'post',
        data: vi.data,
      },
      verify: {
        statusCode: 201,
        body: vi.data,
      },
    });
  });

  // Create POST test for creating objects with valid input
  validUpdateInputs.forEach(vi => {
    testData.okTests.push({
      name: vi.name,
      before: [],
      input: {
        method: 'put',
        route: 'countries/' + updateObjectId,
        data: vi.data,
      },
      verify: {
        statusCode: 200,
        body: vi.data,
      },
    });
    console.log(testData.okTests);
  });

  // Create POST test for creating objects with invalid input
  invalidCreateInputs.forEach(ii => {
    let input = Object.assign({}, validCreateInputs[0].data);
    for (const key in ii.data) {
      const val = ii.data[key];
      if (val === undefined) {
        delete input[key];
      }
      else {
        input[key] = val;
      }
    }

    testData.errorTests.push({
      name: ii.name,
      before: [],
      input: {
        method: 'post',
        data: input,
      },
      verify: {
        statusCode: 400,
        errorCode: 'ValidationError',
      },
    });
  });

  // Create PUT test for updating objects with invalid input
  invalidUpdateInputs.forEach(ii => {
    let input = Object.assign({}, validUpdateInputs[0].data);
    for (const key in ii.data) {
      const val = ii.data[key];
      if (val === undefined) {
        delete input[key];
      }
      else {
        input[key] = val;
      }
    }

    testData.errorTests.push({
      name: ii.name,
      before: [],
      input: {
        method: 'put',
        route: route + '/' + existingObjectId,
        data: input,
      },
      verify: {
        statusCode: 400,
        errorCode: 'ValidationError',
      },
    });
  });

  return testData;
}
