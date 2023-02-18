import { atom } from 'recoil';
import { v1 } from 'uuid';

export interface Login {
	loginState: boolean | null;
}
export const loginAtom = atom<Login>({
	default: {
		loginState: null,
	},
	key: `loginState/${v1()}`,
});
