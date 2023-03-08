interface UserData {
	id?: string;
	email: string;
	name?: string;
	password: string;
}

interface LoginToken extends Pick<UserData, 'id' | 'email' | 'name'> {
	accessToken: string;
}

export type { UserData, LoginToken };
