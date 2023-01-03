import { atom } from 'recoil';
import { v1 } from 'uuid';

export interface Login {
	loginState: boolean;
}
export const loginAtom = atom<Login>({
	default: {
		loginState: false,
	},
	key: `loginState/${v1()}`,
});
