import { atom } from "recoil";
import { v1 } from "uuid";
export interface Login{
    loginState : boolean;
    accessToken : string;
}
export const loginAtom = atom<Login>({
    default: {
        loginState: false,
        accessToken: "",
    },
    key: `loginState/${v1()}`
});