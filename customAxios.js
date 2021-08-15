import axios from "axios";
import {store} from "../redux/store";


//const  urlDev = 'http://localhost:3000'; // MUST CHANGE


function getUserToken(){
    return store.getState().user.token || 0;
}

function getAuthorizationHeader(){
    const token = getUserToken();
    if(token)
        return `Bearer ${token}`
    else
        return '';
}

export function customAxios(){
    const axiosInstance = axios.create({
        baseURL: urlDev,
        timeout: 5000,
    });

    /* Request */
    axiosInstance.interceptors.request.use(req => {
        const tokenAuth = getAuthorizationHeader();
        if(tokenAuth !== ''){
            req.headers.Authorization = tokenAuth;
        }
        return req;
    });
    /* Response */
    axiosInstance.interceptors.response.use(function(response){
        /* On success = status code 200 */
        return response.data;
    }, function(error){
        /* On failure = status code <> 200 */
        return Promise.reject(error);
    });

    return axiosInstance;
}
