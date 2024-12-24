import { CarRepository } from '../../../db/mongo/repositories/CarRepository';
import { CarService } from '../../../../core/services/Car';
import { CarController } from '../../../http/express/controllers/CarController';
import { CarRoute } from '../../../http/express/routes/CarRoute';

export class Container {
    private static repositories: Map<string, any> = new Map();
    private static services: Map<string, any> = new Map();
    private static controllers: Map<string, any> = new Map();
    private static routes: Map<string, any> = new Map();

    private static initializeRepositories(): void {
        this.repositories.set('carRepository', new CarRepository());
    }

    private static initializeServices(): void {
        this.services.set('carService', new CarService(this.repositories.get('carRepository')));
    }

    private static initializeControllers(): void {
        this.controllers.set('carController', new CarController(this.services.get('carService')));
    }

    private static initializeRoutes(): void {
        this.routes.set('carRoutes', new CarRoute(this.controllers.get('carController')));
    }

    static initialize() {
        this.initializeRepositories();
        this.initializeServices();
        this.initializeControllers();
        this.initializeRoutes();

        return {
            repositories: this.repositories,
            services: this.services,
            controllers: this.controllers,
            routes: this.routes
        };
    }
}
