import { atom } from "recoil";

export const loginAtom = atom<boolean | false>({
    default: false,
    key: "loginState"
});