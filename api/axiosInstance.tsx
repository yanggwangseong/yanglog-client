import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
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

// remove storage
export const removeToStorage = (key:string) => {
    if (typeof window !== 'undefined') {
        return window.localStorage.removeItem(key);
    }
}

export const refreshToken = async() =>{
    const response = await apiClient.get(`/users/refreshtoken`);
    return response.data;
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
        //'Authorization': 'Bearer '+getFromStorage('accessToken')
    },
    transformRequest:[
        (data) => {
            console.log("1");
            return JSON.stringify(data);
        },
    ],
    transformResponse: [
        (data) => {
            console.log("2");
            return JSON.parse(data);
        },
    ],
});

AuthApiClient.interceptors.request.use( //accessToekn 유효한지 체크, 백엔드에서 토큰 유효 확인.
    async(config: AxiosRequestConfig)=>{
        config.headers!['Authorization'] = `Bearer ${getFromStorage('accessToken')}`;
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
AuthApiClient.interceptors.response.use(
    (response: AxiosResponse) => { //AccessToken 유효함.
        return response;
    },
    async (error) => {
        
        // const { config, response: {status}} = error;
        // if(status === 401){
        //     if(error.response.data.message === "Unauthorized"){
        //         const data = await refreshToken();
        //         //saveToStorage("accessToken",data.accessToken);
        //         //console.log(data);

        //         //const newconfig = config;
        //         config.headers={
        //             Authorization:`Bearer ${data.accessToken}`,
        //         }
        //         //axios.defaults.headers.common.Authorization = `Bearer ${data.accessToken}`;
        //         //newconfig.headers.Authorization = `Bearer ${data.accessToken}`;
                
        //         //return axios(newconfig);
        //         // 새로 발급받은 accessToken으로 다시 axios 요청 하는건데 
        //         // 없어도 이미 accessToken을 새로 발급받아 localstorage에 저장해서
        //         // 예를들어 users/checkUser 요청이 실행되기전에 이미 최신화됨.
        //         // 아니다 발급 받은후 다시 axios 요청해서 최신화 시켜줘야됨!!!
        //         return axios(config);
        //     }
        // }
        const { config, response: {status}} = error;
        const originalConfig = error.config;
            
            //accessToken 유효기간 만료
            if(status ===401 && !originalConfig._retry){
                originalConfig._retry = true;
                try{
                    
                    const response = await refreshToken();
                    const { accessToken } = response;
                    saveToStorage("accessToken",accessToken);
                    AuthApiClient.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
                    originalConfig.headers.Authorization = `Bearer ${accessToken}`;
                    return AuthApiClient(originalConfig);
                } catch (_error:any){ //refresh token 만료
        
                    localStorage.removeItem('accessToken');
                    //로그아웃 호출 하면 될듯?
                    if(_error.response && _error.response.data){
                        return Promise.reject(_error.response.data);
                    }
                    return Promise.reject(_error);
                }
            }
            if (error.response.status === 403 && error.response.data) {
                return Promise.reject(error.response.data);
            }
        return Promise.reject(error);
    }
)