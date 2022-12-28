import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getFromStorage } from "../api/axiosInstance";
import { checkUser } from "../api/userService";
import { loginAtom } from "../atoms/loginAtom";


type AppLayoutProps = {
    children: React.ReactNode;
};

const Root = ({children}:AppLayoutProps) => {

    const [LoginState, SetLoginState] = useRecoilState(loginAtom);
    
    useEffect(() => {
        const accessToken = getFromStorage('accessToken');
        async function refreshData() {
          const data =  checkUser(accessToken ? accessToken : "");
          return data;
        }
        refreshData().then((response)=> SetLoginState({loginState:response.loginState}));
        
    },[]);
    
    return (
        <>
            {children}
        </>
    );
}

export default Root;