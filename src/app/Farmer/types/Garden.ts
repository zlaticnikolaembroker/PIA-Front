import { Seedling } from './Seedling';

export interface Garden {
    id: number, 
    name: string,
    place: string,
    free_slots: number,
    occupied_slots: number,
    producer: string,
    water: number,
    temperature: number,
    height: number,
    width: number,
    seedlings: Seedling[],
}