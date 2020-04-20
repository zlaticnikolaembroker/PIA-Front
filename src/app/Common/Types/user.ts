import { Nullable } from './nullable';

export interface User {
    id: Nullable<number>,
    name: Nullable<string>,
    username: string,
    password: string,
    email: string,
    role_id: number,
    date: Date,
    place: string,
    lastname: Nullable<string>,
    phone: Nullable<string>,
    fullName: Nullable<string>,
};