



import { ICar, ICarRepository, ICarService, ICarQuery } from "../ports/Car";
import { Car } from "../entities/Car";

export class CarService implements ICarService {
    constructor(private repository: ICarRepository) {}

    async create(car: ICar): Promise<ICar> {
        const newCar = new Car(car?.id, car.name, car.year, car.price);
        return await this.repository.create(newCar.toJSON());
    }

    async find(query?: ICarQuery): Promise<ICar[]> {
        return await this.repository.find(query);
    }

    async findOne(query?: any): Promise<ICar | null> {
        return await this.repository.findOne(query);
    }

    async update(id: string, car: Partial<ICar>): Promise<ICar> {
        return await this.repository.update(id, car);
    }

    async delete(id: string): Promise<boolean> {
        return await this.repository.delete(id);
    }

    async findByYear(year: number): Promise<ICar[]> {
        return await this.repository.find({ year });
    }

    async findByPriceRange(min: number, max: number): Promise<ICar[]> {
        return await this.repository.find({ price: { min, max } });
    }
}
