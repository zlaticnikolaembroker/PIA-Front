import { Nullable } from './nullable';
import { Farmer } from './farmer';
import { Company } from './company';

export class User {
    id: Nullable<number>;
    name: Nullable<string>;
    username: string;
    password: string;
    email: string;
    role_id: number;
    date: Date;
    place: string;
    lastname: Nullable<string>;
    phone: Nullable<string>;
    fullName: Nullable<string>;
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
            fullname: user.fullName,
            id: user.id,
            password: user.password,
            place: user.place,
            username: user.username,
        } as Company;
    }
};

