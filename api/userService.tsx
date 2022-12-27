import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
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


// export const AuthApiClient = axios.create({
//     baseURL: "http://localhost:3001",
//     withCredentials: true,
//     headers: {
//         'Content-type': 'application/json',
//         //'Authorization': 'Bearer '+getFromStorage('accessToken')
//     },
//     transformRequest:[
//         (data) => {
//             return JSON.stringify(data);
//         },
//     ],
//     transformResponse: [
//         (data) => {
//             return JSON.parse(data);
//         },
//     ],
// })

export const loginUser = async ({email, password}:User) => {
    const response = await apiClient.post<LoginToken>(`/users/signin`, {
        email,
        password
    });
    return response.data;
};

export const refreshToken = async() =>{
    const response = await apiClient.get(`/users/refreshtoken`);
    //console.log(response.data);
    return response.data;
}

export const checkUser = async(accessToken:string) => {
    
    //apiClient.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    apiClient.interceptors.request.use( //accessToekn 유효한지 체크, 백엔드에서 토큰 유효 확인.
        async(config: AxiosRequestConfig)=>{
            console.log("axios Request!");
            //config.headers.Authorization = `Bearer ${accessToken}`;
            config.headers={
                Authorization:`Bearer ${accessToken}`,
            }
            return config;
        },
        err => {
            return Promise.reject(err);
        }
    );
    apiClient.interceptors.response.use(
        (response: AxiosResponse) => { //AccessToken 유효함.
            console.log("axios Response!");
            return response;
        },
        async (error) => {
            const { config, response: {status}} = error;
            if(status === 401){
                if(error.response.data.message === "Unauthorized"){
                    const data = await refreshToken();
                    //saveToStorage("accessToken",data.accessToken);
                    //console.log(data);

                    // const newconfig = config;
                    // config.headers={
                    //     Authorization:`Bearer ${data.accessToken}`,
                    // }
                    // return axios(newconfig);
                    // 새로 발급받은 accessToken으로 다시 axios 요청 하는건데 
                    // 없어도 이미 accessToken을 새로 발급받아 localstorage에 저장해서
                    // 예를들어 users/checkUser 요청이 실행되기전에 이미 최신화됨.
                    // 아니다 발급 받은후 다시 axios 요청해서 최신화 시켜줘야됨!!!
                }
            }
            return Promise.reject(error);
        }
    )
    const response = await apiClient.get(`/users/checkUser`);

    return {
        loginState: true,
        email: response.data.email,
        id: response.data.id,
        name: response.data.name,
    };
}



