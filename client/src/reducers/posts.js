export default (posts = [], actions) => {
  switch (actions.type) {
    case 'FETCH_ALL':
      return actions.payload;
    case 'CREATE':
      return [...posts, actions.payload];
    case 'UPDATE':
      return posts.map(post =>
        post._id === actions.payload._id ? actions.payload : post,
      );
    default:
      return posts;
  }
};
