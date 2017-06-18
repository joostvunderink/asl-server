import * as mocha from 'mocha';
import * as chai from 'chai';
import FilterParser from '../src/core/filter.parser';
const fp = new FilterParser();

const expect = chai.expect;

describe('Filter Parser', () => {
  it('does something', () => {
    fp.apply('a', false);
  });
});
