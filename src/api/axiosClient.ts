import axios from 'axios';
import qs from "qs";

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => qs.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    let token: any = localStorage.getItem('token');
    console.log(JSON.parse(token), " Token")
    token = token ? JSON.parse(token) : '';
    const auth = token ? `Bearer ${token.token}` : '';
    config.headers.common['Authorization'] = auth;
    return config;
});

axiosClient.interceptors.response.use((response) => {
    if (response && response.data) {
        return response.data;
    }
    return response;
}, (error) => {
    // Handle errors
    throw error;
});

export default axiosClient;
