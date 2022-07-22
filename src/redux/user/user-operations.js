import { createAsyncThunk } from '@reduxjs/toolkit';
import { getToken } from './user-selectors';
import { register, login, logout, getCurrent } from 'services/user-server-api';

const registerUser = createAsyncThunk('user/register', async userData => {
  try {
    const data = await register(userData);
    return data;
  } catch (error) {
    throw error;
  }
});

const loginUser = createAsyncThunk('user/login', async userData => {
  try {
    const data = await login(userData);
    return data;
  } catch (error) {
    throw error;
  }
});

const logoutUser = createAsyncThunk('user/logout', async () => {
  try {
    await logout();
  } catch (error) {
    throw error;
  }
});

const getCurrentUser = createAsyncThunk('user/current', async (_, thunkAPI) => {
  const persistToken = getToken(thunkAPI.getState());

  if (!persistToken) {
    return thunkAPI.rejectWithValue('Only authorized access');
  }

  try {
    const data = await getCurrent(persistToken);
    return data;
  } catch (error) {
    throw error;
  }
});

export { registerUser, loginUser, logoutUser, getCurrentUser };
