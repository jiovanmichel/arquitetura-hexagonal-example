import { ICarRepository, ICar, ICarQuery } from '../../../../core/ports/Car';
import { CarModel } from '../models/CarModel';

export class CarRepository implements ICarRepository {
    async create(carData: ICar): Promise<ICar> {
        const car = new CarModel(carData);
        await car.save();
        return this.mapToDomain(car);
    }

    async find(query: ICarQuery): Promise<ICar[]> {
        const { price } = query;
        const filter: any = {};

        if (price) {
            if (typeof price === 'object' && price.min && price.max) {    
                filter.price = { $gte: price.min, $lte: price.max };
            } else {
                filter.price = price;
            }
        }

        const cars = await CarModel.find(filter);
        return cars.map(car => this.mapToDomain(car));
    }

    async findOne(query = {}): Promise<ICar | null> {
        const car = await CarModel.findOne(query);
        return this.mapToDomain(car);
    }
    async update(id: string, carData: Partial<ICar>): Promise<ICar> {
        const car = await CarModel.findByIdAndUpdate(id, carData, { new: true });
        return this.mapToDomain(car);
    }

    async delete(id: string): Promise<boolean> {
        const result = await CarModel.findByIdAndDelete(id);
        return !!result;
    }

    private mapToDomain(car: any): ICar {
        return {
            id: car._id.toString(),
            name: car.name,
            year: car.year,
            price: car.price,
        };
    }
} 