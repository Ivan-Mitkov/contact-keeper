import axios from "axios";

const setAuthToken = token => {
  //     You can specify config defaults that will be applied to every request.
  //https://github.com/axios/axios
  // Global axios defaults
  // axios.defaults.baseURL = 'https://api.example.com';
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-tocken"];
  }
};

export default setAuthToken;
