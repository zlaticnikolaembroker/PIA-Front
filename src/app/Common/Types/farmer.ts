import { Nullable } from './nullable';

export interface Farmer {
    id: number,
    name: string,
    lastname: string,
    username: string,
    password: string,
    email: string,
    date: Date,
    place: string,
    phone: string,
    confirmed: Nullable<boolean>;
}