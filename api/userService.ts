import axios from 'axios';

export interface User{
    email : String;
    password: String;
}

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-type': 'application/json',
    },
    
    transformResponse: [
        (data) => {
            return JSON.parse(data);
        },
    ],
});

export const loginUser = async ({email, password}:User) => {
    const response = await apiClient.post<User>(`/user/signin`, {
        email,
        password
    });
    return response.data;
};

