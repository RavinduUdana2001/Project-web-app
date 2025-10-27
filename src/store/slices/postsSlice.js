import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllPosts } from '../../lib/api.js'; // Path updated to lib/

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async () => {
    const response = await getAllPosts();
    return response;
  }
);

// ... (rest of the slice is unchanged)
const initialState = { posts: [], status: 'idle', error: null };

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => { state.status = 'loading'; })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default postsSlice.reducer;
