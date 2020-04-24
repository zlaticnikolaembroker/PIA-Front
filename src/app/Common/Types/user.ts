import { Nullable } from './nullable';
import { Farmer } from './farmer';
import { Company } from './company';
import { Admin } from './admin';

export class User {
    id: Nullable<number>;
    name: Nullable<string>;
    username: string;
    password: string;
    email: string;
    role_id: number;
    date: Nullable<Date>;
    place: Nullable<string>;
    lastname: Nullable<string>;
    phone: Nullable<string>;
    fullname: Nullable<string>;
    static toFarmer(user: User): Farmer {
        return {
            id: user.id,
            name: user.name,
            date: user.date,
            email: user.email,
            lastname: user.lastname,
            password: user.password,
            phone: user.phone,
            place: user.place,
            username: user.username,
        } as Farmer;
    };
    static toCompany(user: User): Company {
        return {
            date: user.date,
            email: user.email,
            fullname: user.fullname,
            id: user.id,
            password: user.password,
            place: user.place,
            username: user.username,
        } as Company;
    };
    static toAdmin(user: User): Admin {
        return {
            id: user.id,
            password: user.password,
            username: user.username,
            email: user.email,
        } as Admin;
    }
};

