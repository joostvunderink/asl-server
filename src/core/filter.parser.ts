export default class FilterParser {
  parse(filter) {

  }

  apply(query, filter) {
    if (!filter) {
      return query;
    }

    const where = filter.where;
    Object.keys(where).forEach(key => {
      const value = where[key];
      query = query.where(key, value);
    });

    return query;
  }
}