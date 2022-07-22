import axios from 'axios';

axios.defaults.baseURL = 'https://connections-api.herokuapp.com';

const token = {
  set: token =>
    (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`),
  unset: () => (axios.defaults.headers.common['Authorization'] = ''),
};

async function register(userData) {
  try {
    const { data } = await axios.post('/users/signup', userData);
    token.set(data.token);
    return data;
  } catch ({ response }) {
    if (response.status === 400 && response.data.message) {
      throw new Error(`Error: ${response.data.message}`);
    }

    throw new Error(`Error server connection. Code: ${response.status}.`);
  }
}

async function login(userData) {
  try {
    const { data } = await axios.post('/users/login', userData);
    token.set(data.token);
    return data;
  } catch ({ response }) {
    if (response.status === 400) {
      throw new Error(`Wrong login or password`);
    }

    throw new Error(`Error server connection. Code: ${response.status}.`);
  }
}

async function logout() {
  try {
    await axios.post('/users/logout');
    token.unset();
  } catch ({ response }) {
    throw new Error(`Error server connection. Code: ${response.status}.`);
  }
}

async function getCurrent(persisToken) {
  token.set(persisToken);

  try {
    const { data } = await axios.get('/users/current');
    return data;
  } catch ({ response }) {
    throw new Error(`Error server connection. Code: ${response.status}.`);
  }
}

export { register, login, logout, getCurrent };
