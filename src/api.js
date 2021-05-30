const axios = require('axios');

baseUrl = "20.0.1.238:8000";

axios.defaults.baseURL = baseUrl;

async function getUser() {
    try {
      const response = await axios.get('20.0.1.238:8000/api/?developer=anerg');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  }

  getUser();