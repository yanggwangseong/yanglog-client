import { atom } from 'recoil';
import { v1 } from 'uuid';

export interface Login {
	loginState: boolean | null;
	email?: string;
	id?: string;
	name?: string;
}
export const defaultOptionsLoginAtom = {
	loginState: null,
	id: '',
	name: '',
	email: '',
};

export const resetOptionsLoginAtom = {
	loginState: false,
	id: '',
	name: '',
	email: '',
};
export const loginAtom = atom<Login>({
	default: defaultOptionsLoginAtom,

	key: `loginState/${v1()}`,
});
