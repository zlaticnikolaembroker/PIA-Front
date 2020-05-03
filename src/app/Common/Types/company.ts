import { Nullable } from './nullable';

export class Company {
    id: number;
    username: string;
    password: string;
    email: string;
    date: Date;
    place: string;
    fullname: string;
    confirmed: Nullable<boolean>;
}