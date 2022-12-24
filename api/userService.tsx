import axios from 'axios';
import { LoginToken, User } from '../interfaces/user';

export const apiClient = axios.create({
    baseURL: "http://localhost:3001",
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

export const loginUser = async ({email, password}:User) => {
    const response = await apiClient.post<LoginToken>(`/users/login`, {
        email,
        password
    });
    return response.data;
};

