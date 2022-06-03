export default (posts = [], actions) => {
  switch (actions.type) {
    case 'FETCH_ALL':
      return actions.payload;
    case 'CREATE':
      return posts;
    default:
      return posts;
  }
};
