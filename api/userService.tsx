import axios from 'axios';
import { LoginToken, User } from '../interfaces/user';

// save to storage
export const saveToStorage = (key:string, value:string) => {
    if(typeof window !== 'undefined') {
        return window.localStorage.setItem(key, value);
    }
}

// get from storage
export const getFromStorage = (key:string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.getItem(key);
    }
}


export const apiClient = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
    },
    transformRequest:[
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
});

export const AuthApiClient = axios.create({
    baseURL: "http://localhost:3001",
    withCredentials: true,
    headers: {
        'Content-type': 'application/json',
        'Authorization': getFromStorage('accessToken')
    },
    transformRequest:[
        (data) => {
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
})

export const loginUser = async ({email, password}:User) => {
    const response = await apiClient.post<LoginToken>(`/users/signin`, {
        email,
        password
    });
    return response.data;
};

export const refreshToken = async() =>{
    const response = await apiClient.get(`/users/refreshtoken`);
    console.log(response.data);
    return response.data;
}

export const checkUser = async() => {
    const response = await AuthApiClient.get(`/users/checkUser`);
    console.log(response);
    return response;
}



