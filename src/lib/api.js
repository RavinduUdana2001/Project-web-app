import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:5000/api',
});

/**
 * Creates a new post by sending the data and auth token to the backend.
 * @param {object} postData - The data for the post { title, explanation, tags }.
 * @param {string} token - The user's Firebase ID token.
 * @returns The new post object returned from the server.
 */
export const createPost = async (postData, token) => {
  try {
    const response = await apiClient.post('/posts', postData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post in api.js:", error);
    throw error;
  }
};


/**
 * Fetches all posts from the backend.
 * This is a public endpoint, so no token is needed.
 * @returns An array of all post objects.
 */
export const getAllPosts = async () => {
  try {
    const response = await apiClient.get('/posts');
    return response.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    throw error;
  }
};
