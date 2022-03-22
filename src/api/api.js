const axios = require("axios");
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    console.log("Interceptors Before Api Request");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);
// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
const api = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(" http://localhost:9000/user")
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  updateCoin: (CurrentCoin) => {
    return new Promise((resolve, reject) => {
      axios
        .put(" http://localhost:9000/user/0", {
          coin: {
            ten_coin: CurrentCoin.ten_coin,
            five_coin: CurrentCoin.five_coin,
            two_coin: CurrentCoin.two_coin,
          },
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
export default api;
