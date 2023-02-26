import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import blogService from "./blogService";

const initialState = {
  blogs: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  mesage: "",
};

export const getAllBlogs = createAsyncThunk(
  "blog/getAll",
  async (_, thunkAPI) => {
    try {
      return await blogService.getAllBlogs();
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blog/create",
  async (blog, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.user).token;
      return await blogService.createBlog(blog, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const deletBlog = createAsyncThunk(
  "blog/delete",
  async (id, thunkAPI) => {
    try {
      const token = JSON.parse(localStorage.user).token;
      return await blogService.deletBlog(id, token);
    } catch (error) {
      const message = error.response.data.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.mesage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllBlogs.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = actions.payload;
      })
      .addCase(getAllBlogs.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.mesage = actions.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(actions.payload);
      })
      .addCase(createBlog.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.mesage = actions.payload;
      })
      .addCase(deletBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deletBlog.fulfilled, (state, actions) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = state.blogs.filter(
          (blog) => blog._id !== actions.payload.id
        );
      })
      .addCase(deletBlog.rejected, (state, actions) => {
        state.isLoading = false;
        state.isError = true;
        state.mesage = actions.payload;
      });
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
