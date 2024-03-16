import axios from 'axios';
import Cookies from 'js-cookie';

export const customHeaders = {
    Accept: 'application/json',
};

export const baseUrl = `https://backend.qistbazaar.pk`;

export const apiBaseURL = `${baseUrl}/api`;

// Create an Axios instance
const axiosInstance = axios.create({
    baseURL: apiBaseURL, // Notice the change here from apiBaseURL to baseURL
    headers: customHeaders,
});

// Add a request interceptor
axiosInstance.interceptors.request.use((config) => {
    // Retrieve token from Cookies
    const token = Cookies.get('token');
    
    // If the token exists, add it to the request's headers
    if (token) {
        config.headers['x-access-token'] = token;
    }
    
    return config;
}, (error) => {
    // Do something with request error
    return Promise.reject(error);
});

export default axiosInstance;

export const serializeQuery = (query) => {
    return Object.keys(query)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
};
