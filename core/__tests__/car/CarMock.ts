import { ICarRepository, ICar, ICarQuery } from "../../ports/Car";
import { Car } from "../../entities/Car";

export class CarRepositoryMock implements ICarRepository {
    private cars: Car[] = []

    async create(car: Car): Promise<Car> {
        this.cars.push(car);
        return car;
    }

    async update(id: string, carData: Partial<ICar>): Promise<ICar> {
        const index = this.cars.findIndex((car) => car.id === id)
        if (index >= 0) {
            this.cars[index] = { ...this.cars[index], ...carData } as Car
        }
        return this.cars[index]
    }

    async delete(id: string): Promise<boolean> {
        this.cars = this.cars.filter(car => car.id !== id)
        return true
    }

    async find(query?: ICarQuery): Promise<Car[]> {
        if (!query) return this.cars;
        
        return this.cars.filter((car) => {
            return Object.entries(query).every(([key, value]) => {
                if (!value) return true;
                return car[key as keyof Car] === value;
            });
        });
    }

    async findOne(query?: ICarQuery): Promise<Car | null> {
        if (!query) {
            return this.cars[this.cars.length - 1] || null;
        }

        const filteredCars = this.cars.filter((car) => {
            return Object.entries(query).every(([key, value]) => {
                if (!value) return true;
                return car[key as keyof Car] === value;
            });
        });

        return filteredCars.length > 0 ? filteredCars[0] : null;
    }
}