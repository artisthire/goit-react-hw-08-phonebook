import axios from 'axios';

const getContactsByName = async name => {
  try {
    const { data } = await axios.get(`/contacts?name=${name}`);
    return data;
  } catch (error) {
    throw error;
  }
};

export { getContactsByName };
