import { createSlice } from '@reduxjs/toolkit';
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from './user-operations';
import { clearErrors } from './user-actions';

const initialState = {
  profile: {
    name: '',
    email: '',
  },
  token: '',
  isLogin: false,
  isFetchingCurrentUser: false,
  error: { register: '', login: '', logout: '', getCurrent: '' },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: {
    [registerUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.isLogin = true;
      state.error.register = '';
    },
    [registerUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.error = { ...initialState.error, register: error.message };
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.profile = payload.user;
      state.token = payload.token;
      state.isLogin = true;
      state.error.login = '';
    },
    [loginUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.error = { ...initialState.error, login: error.message };
    },
    [logoutUser.fulfilled]: state => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.error = initialState.error;
    },
    [logoutUser.rejected]: (state, { error }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.error = { ...initialState.error, logout: error.message };
    },
    [getCurrentUser.pending]: state => {
      state.isFetchingCurrentUser = true;
    },
    [getCurrentUser.fulfilled]: (state, { payload }) => {
      state.profile = payload;
      state.isLogin = true;
      state.isFetchingCurrentUser = false;
      state.error.getCurrent = '';
    },
    [getCurrentUser.rejected]: (state, { payload }) => {
      state.profile = initialState.profile;
      state.token = '';
      state.isLogin = false;
      state.isFetchingCurrentUser = false;
      state.error = {
        ...initialState.error,
        getCurrent: payload,
      };
    },
    [clearErrors]: state => {
      state.error = initialState.error;
    },
  },
});

export default userSlice;
