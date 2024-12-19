export interface ICar {
    id?: string;
    name: string;
    year: number;
    price: number;
}

interface IPriceRange {
    min: number;
    max: number;
}

export interface ICarQuery {
    id?: string;
    name?: string;
    year?: number;
    price?: number | IPriceRange;
}

export interface ICarRepository {
    create(car: ICar): Promise<ICar>;
    update(id: string, car: Partial<ICar>): Promise<ICar>;
    delete(id: string): Promise<boolean>;
    find(query?: ICarQuery): Promise<ICar[]>;
    findOne(query?: ICarQuery): Promise<ICar | null>;
}

export interface ICarService {
    create(car: ICar): Promise<ICar>;
    find(query: ICarQuery): Promise<ICar[]>;
    findOne(query: ICarQuery): Promise<ICar | null>;
    update(id: string, car: Partial<ICar>): Promise<ICar>;
    delete(id: string): Promise<boolean>;

    // Queries adicionais comuns
    findByYear(year: number): Promise<ICar[]>;
    findByPriceRange(min: number, max: number): Promise<ICar[]>;
}
