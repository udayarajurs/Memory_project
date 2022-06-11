import {
  FETCH_ALL,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
  FETCH_BY_SEARCH,
  START_LOADING,
  END_LOADING,
} from '../constants/actionTypes';
import * as api from '../api';

// Actions Creators
export const getPosts = page => async dispatch => {
  try {
    dispatch({type: START_LOADING});
    const {data} = await api.fetchPosts(page);
    dispatch({type: FETCH_ALL, payload: data});
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error.message);
  }
};

export const getPostsBySearch = searchQuery => async dispatch => {
  try {
    dispatch({type: START_LOADING});
    const {
      data: {data},
    } = await api.fetchPostsBySearch(searchQuery);

    dispatch({type: FETCH_BY_SEARCH, payload: data});
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};

export const createPost = post => async dispatch => {
  try {
    dispatch({type: START_LOADING});
    const {data} = await api.createPost(post);

    dispatch({type: CREATE, payload: data});
    dispatch({type: END_LOADING});
  } catch (error) {
    console.log(error);
  }
};
export const updatePost = (id, post) => async dispatch => {
  try {
    const {data} = await api.updatePost(id, post);

    dispatch({type: UPDATE, payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = id => async dispatch => {
  try {
    await api.deletePost(id);

    dispatch({type: DELETE, payload: id});
  } catch (error) {
    console.log(error.message);
  }
};

export const likePost = id => async dispatch => {
  try {
    const {data} = await api.likePost(id);

    dispatch({type: LIKE, payload: data});
  } catch (error) {
    console.log(error.message);
  }
};
