const axios = require("axios");
axios.defaults.baseURL = "https://api.example.com";

axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
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
// Header for Line Push message to line group
const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_ENDPOINT}`,
  headers: {
    Authorization: `Bearer ${process.env.REACT_APP_LINE_TOKEN}`,
    "Content-Type": "application/json",
  },
});
const api = {
  getUser: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/user`)
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
        .put(`${process.env.REACT_APP_BASE_URL}/user/0`, {
          name: "Mockup User",
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
  getWashingMachine: () => {
    return new Promise((resolve, reject) => {
      axios
        .get(`${process.env.REACT_APP_BASE_URL}/washing_machine`)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //-----------------------------------------------------------
  seveTimer: (data) => {
    return new Promise((resolve, reject) => {
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/machineTimer`, {
          washing_machine_id: data.washing_machine_id,
          the_rest_coin: data.coin,
          the_rest_milisec: data.milisec,
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  getTimeByMachineId: (machineID) => {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.REACT_APP_BASE_URL}/machineTimer?washing_machine_id=${machineID}`
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject("Not have time the rest");
        });
    });
  },
  updateTimer: (data) => {
    return new Promise((resolve, reject) => {
      axios
        .put(
          `${process.env.REACT_APP_BASE_URL}/machineTimer`,
          {
            washing_machine_id: data.machineNum,
            the_rest_coin: data.coin,
            the_rest_milisec: data.theRestMilisec,
          }
        )
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //--------------------------------------------------------------
  pushMessageToLine: (message) => {
    return new Promise((resolve, reject) => {
      axiosInstance
        .post("/push", {
          to: `${process.env.REACT_APP_CHAT_GROUP}`,
          messages: [
            {
              type: "text",
              text: message,
            },
          ],
        })
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};

export default api;
