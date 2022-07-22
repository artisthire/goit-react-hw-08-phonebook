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
    [registerUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.isLogin = true;
      state.errors.register = '';
    },
    [registerUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = { ...initialState.errors, register: error.message };
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.isLogin = true;
      state.errors.login = '';
    },
    [loginUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = { ...initialState.errors, login: error.message };
    },
    [logoutUser.fulfilled]: state => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = initialState.errors;
    },
    [logoutUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.errors = { ...initialState.errors, logout: error.message };
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
