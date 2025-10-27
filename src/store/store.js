import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/postsSlice.js'; // Path updated

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
