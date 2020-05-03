import { Nullable } from './nullable';

export interface Admin {
    id: number;
    username: string;
    password: string;
    email: string;
    confirmed: Nullable<boolean>;
}