import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    name: { type: String, required: true },
    year: { type: Number, required: true },
    price: { type: Number, required: true }
}, {
    timestamps: true
});

export const CarModel = mongoose.model('Car', carSchema); 