import axios from "axios";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:5000';

// const APP_AXIOS = axios.create({ withCredentials: true });

const APP_AXIOS = axios.create({
    baseURL: SERVER_BASE_URL, // Set the backend server URL
    withCredentials: true,   // Include cookies for session management
  });

export { SERVER_BASE_URL, APP_AXIOS };
