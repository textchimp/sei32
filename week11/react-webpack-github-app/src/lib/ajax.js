import axios from 'axios';

const BASE_URL = 'https://api.github.com/users';
const AUTH_TOKENS = '?client_id=4ec1b8f9c149f7c46ffd&client_secret=a05ec287c29ebd9633131b5a08298530709130e9';

export default {
  getUserInfo(username){
    return axios.get(`${BASE_URL}/${ username }${AUTH_TOKENS}`);
  },
  getUserRepos(username){
    return axios.get(`${BASE_URL}/${ username }/repos${AUTH_TOKENS}`);
  }
};
