import express, { Request, Response } from 'express';
import { ICarController } from '../controllers/CarController';

export class CarRoute {
    private router = express.Router();

    constructor(private carController: ICarController) {
        this.setupRoutes();
    }

    private setupRoutes(): void {
        // Get cars by year
        this.router.get('/year/:year', (req: Request, res: Response) => this.carController.findByYear(req, res));
        // Get cars by price range
        this.router.get('/price-range/:min/:max', (req: Request, res: Response) => this.carController.findByPriceRange(req, res));
        // Create a new car
        this.router.post('/', (req: Request, res: Response) => this.carController.create(req, res));
        // Get all cars with optional query parameters
        this.router.get('/', (req: Request, res: Response) => this.carController.find(req, res));
        // Get car by ID
        this.router.get('/:id', (req: Request, res: Response) => this.carController.findOne(req, res));
        // Update car by ID
        this.router.put('/:id', (req: Request, res: Response) => this.carController.update(req, res));
        // Delete car by ID
        this.router.delete('/:id', (req: Request, res: Response) => this.carController.delete(req, res));
    }

    getRouter() {
        return this.router;
    }
}
