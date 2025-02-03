import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/postsSlice';
import searchReducer from './features/searchSlice';

const store = configureStore({
  reducer: {
    posts: postsReducer,
    search: searchReducer,
  },
});

export default store;
