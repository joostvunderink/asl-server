export function createValidationTestData({
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
        route: route + '/' + updateObjectId,
        data: vi.data,
      },
      verify: {
        statusCode: 200,
        body: vi.data,
      },
    });
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
