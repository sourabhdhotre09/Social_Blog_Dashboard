import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Initial state
const initialState = {
  posts: [],
  loading: false,
  error: null,
};

// Create slice
const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.posts.push(action.payload);
    },
    removePost: (state, action) => {
      state.posts = state.posts.filter(post => post.id !== action.payload);
    },
    updatePost: (state, action) => {
      const index = state.posts.findIndex(post => post.id === action.payload.id);
      if (index !== -1) {
        state.posts[index] = action.payload;
      }
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// Export actions
export const { setPosts, addPost, removePost, updatePost, setLoading, setError } = postsSlice.actions;

// Async thunk to fetch posts
export const fetchPosts = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
    dispatch(setPosts(response.data));
  } catch (error) {
    dispatch(setError('Failed to fetch posts,',error));
  } finally {
    dispatch(setLoading(false));
  }
};

export default postsSlice.reducer;
