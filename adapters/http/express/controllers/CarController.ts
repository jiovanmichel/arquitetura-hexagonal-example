import { Request, Response } from 'express';
import { ICarService } from '../../../../core/ports/Car';

export interface ICarController {
    create(req: Request, res: Response): Promise<void>;
    find(req: Request, res: Response): Promise<void>;
    findOne(req: Request, res: Response): Promise<void>;
    update(req: Request, res: Response): Promise<void>;
    delete(req: Request, res: Response): Promise<void>;
    findByYear(req: Request, res: Response): Promise<void>;
    findByPriceRange(req: Request, res: Response): Promise<void>;
}

export class CarController implements ICarController {
    constructor(private carService: ICarService) {}

    async create(req: Request, res: Response): Promise<void> {
        try {
            const car = await this.carService.create(req.body);
            res.status(201).json(car);
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        try {
            const cars = await this.carService.find(req.query);
            res.json(cars);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async findOne(req: Request, res: Response): Promise<void> {
        try {
            const car = await this.carService.findOne({ id: req.params.id });
            if (!car) {
                res.status(404).json({ error: 'Car not found' });
                return;
            }
            res.json(car);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const car = await this.carService.update(req.params.id, req.body);
            if (!car) {
                res.status(404).json({ error: 'Car not found' });
                return;
            }
            res.json(car);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const deleted = await this.carService.delete(req.params.id);
            if (!deleted) {
                res.status(404).json({ error: 'Car not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async findByYear(req: Request, res: Response): Promise<void> {
        console.log(req.params.year);
        try {
            const year = parseInt(req.params.year);
            const cars = await this.carService.findByYear(year);
            res.json(cars);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async findByPriceRange(req: Request, res: Response): Promise<void> {
        const { min, max } = req.params || {};
        try {
            const cars = await this.carService.findByPriceRange(parseFloat(min), parseFloat(max));
            res.json(cars);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
}
