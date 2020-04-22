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
    toFarmer(): Farmer {
        return {
            id: this.id,
            name: this.name,
            date: this.date,
            email: this.email,
            lastname: this.lastname,
            password: this.password,
            phone: this.phone,
            place: this.place,
            username: this.username,
        } as Farmer;
    };
    toCompany(): Company {
        return {
            date: this.date,
            email: this.email,
            fullname: this.fullName,
            id: this.id,
            password: this.password,
            place: this.place,
            username: this.username,
        } as Company;
    }
};

