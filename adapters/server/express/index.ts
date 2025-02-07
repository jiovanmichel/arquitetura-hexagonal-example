import express from 'express';
import cors from 'cors';
import { connectMongo } from '@adapters/db/mongo/connect';
import { Container } from '@adapters/server/express/config/Container';
import { RouteLoader } from '@adapters/server/express/config/RouteLoader';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectMongo();

// Dependency Injection
const container = Container.initialize();

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});
 
// Routes
RouteLoader.load(app, container.routes);

// Start server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
}); 