import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from './user-operations';

const initialState = {
  profile: {
    name: '',
    email: '',
  },
  token: '',
  isLogin: false,
  isLoading: false,
  isFetchingCurrentUser: false,
  errors: { register: '', login: '', logout: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearErrors: state => {
      state.errors = initialState.errors;
    },
  },
  extraReducers: {
    [registerUser.pending]: state => {
      state.isLoading = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.isLogin = true;
      state.errors.register = '';
      state.isLoading = false;
    },
    [registerUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = { ...initialState.errors, register: error.message };
      state.isLoading = false;
    },
    [loginUser.pending]: state => {
      state.isLoading = true;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.isLogin = true;
      state.errors.login = '';
      state.isLoading = false;
    },
    [loginUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = { ...initialState.errors, login: error.message };
      state.isLoading = false;
    },
    [logoutUser.pending]: state => {
      state.isLoading = true;
    },
    [logoutUser.fulfilled]: state => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = initialState.errors;
      state.isLoading = false;
    },
    [logoutUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = { ...initialState.errors, logout: error.message };
      state.isLoading = false;
    },
    [getCurrentUser.pending]: state => {
      state.isFetchingCurrentUser = true;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.isLogin = true;
      state.isFetchingCurrentUser = false;
    },
    [getCurrentUser.rejected]: state => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.isFetchingCurrentUser = false;
    },
  },
});

export const { clearErrors } = userSlice.actions;

export default userSlice;
