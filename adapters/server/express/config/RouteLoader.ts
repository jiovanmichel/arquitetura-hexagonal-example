import { Express } from 'express';

export class RouteLoader {
    static load(app: Express, routes: Map<string, any>): void {
        app.use('/cars', routes.get('carRoutes').getRouter());
    }
}
