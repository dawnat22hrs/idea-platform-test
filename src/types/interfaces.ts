import { CURRENCIES } from "./enums";

export interface IUnit {
    id: number,
    unit: string,
    value: CURRENCIES,
}

export interface INumberOfTransfer {
    id: number,
    number: string,
}