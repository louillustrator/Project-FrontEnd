import axios from "axios";
import firebase from "firebase";

const URL = "https://paint-the-town-api.herokuapp.com/api/";

export const checkPassword = (username, password) => {
  return axios
    .get(`${URL}/users/${username}?password=${password}`)
    .then(res => res.data.message)
    .catch(err => err);
};

export const getUsernames = () => {
  return axios.get(`${URL}/users`).then(res => res.data.allUsernames);
};

export const addUser = (username, password) => {
  const user = {
    username,
    password
  };
  return axios.post(`${URL}/users`, user).then(() => "OK");
};

export const storeJourney = journey => {
  return axios
    .post(`${URL}/journeys`, journey)
    .then(({ data }) => data.journey._id);
};

export const storePic = (base64, id, user) => {
  firebase
    .database()
    .ref(`${user}/${id}`)
    .set({ id, img: `data:image/gif;base64,${base64}` });
};

export const getPics = currentUser => {
  return firebase
    .database()
    .ref(currentUser)
    .once("value")
    .then(function(snapshot) {
      return snapshot.val();
    });
};
