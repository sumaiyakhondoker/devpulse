export interface IUser {
    name: string;
    email: string;
    password: string;
    role?: 'contributor'| 'maintainer'
}

export interface IUserLoginInfo {
    email: string;
    password: string
}
