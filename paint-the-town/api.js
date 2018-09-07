import axios from 'axios';
const URL = "https://paint-the-town-api.herokuapp.com/api/";

export const checkPassword = (username, password) => {
    return axios.get(`${URL}/users/${username}?password=${password}`)
    .then(res => res.data.message)
    .catch(err => err)
};

export const getUsernames = () => {
    return axios.get(`${URL}/users`)
    .then(res => res.data.allUsernames);
};

export const addUser = (username, password) => {
    const user = {
        username,
        password
    }
    return axios.post(`${URL}/users`, user)
    .then(() => "OK");
};