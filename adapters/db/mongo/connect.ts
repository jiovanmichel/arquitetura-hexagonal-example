import mongoose from 'mongoose';

export const connectMongo = async () => {
    const {
        MONGODB_HOST = 'mongodb',
        MONGODB_PORT = '27017',
        MONGODB_USER,
        MONGODB_PASSWORD,
        MONGODB_DATABASE = 'arquitetura-hexagonal',
        MONGODB_AUTH_SOURCE = 'admin'
    } = process.env;

    const uri = `mongodb://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DATABASE}?authSource=${MONGODB_AUTH_SOURCE}`;

    try {
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw error;
    }
};

export const disconnectMongo = async () => {
    await mongoose.disconnect();
    console.log('MongoDB disconnected successfully');
};