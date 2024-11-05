import axios from "axios";

const SERVER_BASE_URL = process.env.SERVER_BASE_URL || 'http://localhost:5000';

const APP_AXIOS = axios.create({ withCredentials: true });

export { SERVER_BASE_URL, APP_AXIOS };
