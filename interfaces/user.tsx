interface User {
    email: string;
    password: string;
}

interface LoginToken{
    accessToken:string;
}

export type { User , LoginToken};
