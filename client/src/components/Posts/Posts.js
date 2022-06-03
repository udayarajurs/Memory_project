import React from 'react';
import Post from './Post/Post';
import {useSelector} from 'react-redux';
import useStyles from './styles';
const Posts = () => {
  const posts = useSelector(state => state.posts);
  const classes = useStyles();

  console.log(posts);
  return (
    <div>
      <h1>POSTS</h1>
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default Posts;
