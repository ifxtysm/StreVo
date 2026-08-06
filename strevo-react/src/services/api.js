import axios from "axios";

const api = axios.create({
    baseURL: "https://strevo-api.onrender.com/api"
});

export default api;