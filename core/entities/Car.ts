import { ICar } from "../ports/Car";

export class Car implements ICar {
    constructor(
        private _id: string = '',
        private _name: string,
        private _year: number,
        private _price: number,
    ) {
        this.validatePrice(_price);
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    get name(): string {
        return this._name;
    }

    set name(name: string) {
        this._name = name;
    }

    get year(): number {
        return this._year;
    }

    set year(year: number) {
        this._year = year;
    }

    get price(): number {
        return this._price;
    }

    set price(price: number) {
        this._price = price;
    }

    private validatePrice(price: number): void {
        console.log(price);
        if (price < 0) {
            throw new Error('Price cannot be negative');
        }
        if (!Number.isFinite(price)) {
            throw new Error('Price must be a valid number');
        }
    }

    toJSON() {
        return {
            ...(this._id && { id: this._id }),
            name: this._name,
            year: this._year,
            price: this._price,
        };
    }
}


