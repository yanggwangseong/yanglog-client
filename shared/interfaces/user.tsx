interface User {
	email: string;
	name?: string;
	password: string;
}

interface LoginToken {
	accessToken: string;
}

export type { User, LoginToken };
