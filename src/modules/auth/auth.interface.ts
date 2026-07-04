export interface IUser {
    name: string;
    email: string;
    password: string;
    role: string
}

export interface IUserLoginInfo {
    email: string;
    password: string
}