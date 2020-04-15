export interface LoginResponse {
    status: string;
    data: Data;
}

export interface Data {
    token: string;
    expires: Date;
    user: User;
}

export interface User {
    id: number;
    name: string;
    email: string;
    isNewUser: boolean;
    created: Date;
}
