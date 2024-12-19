import { describe, it, expect, beforeEach } from 'vitest';
import { Car } from '../../entities/Car';

describe('Car Entity', () => {
    describe('Constructor', () => {
        it('should create a car with valid parameters', () => {
            const car = new Car(undefined, 'Test Car', 2023, 50000);
            expect(car.name).toBe('Test Car');
            expect(car.year).toBe(2023);
            expect(car.price).toBe(50000);
        });

        it('should throw error when price is negative', () => {
            expect(() => {
                new Car(undefined, 'Test Car', 2023, -1000);
            }).toThrow('Price cannot be negative');
        });

        it('should throw error when price is not a valid number', () => {
            expect(() => {
                new Car(undefined, 'Test Car', 2023, Number.POSITIVE_INFINITY);
            }).toThrow('Price must be a valid number');
        });
    });

    describe('Setters', () => {
        let car: Car;

        beforeEach(() => {
            car = new Car(undefined, 'Test Car', 2023, 50000);
        });

        it('should update name correctly', () => {
            car.name = 'Updated Car';
            expect(car.name).toBe('Updated Car');
        });

        it('should update year correctly', () => {
            car.year = 2024;
            expect(car.year).toBe(2024);
        });

        it('should update price correctly', () => {
            car.price = 60000;
            expect(car.price).toBe(60000);
        });
    });

    describe('toJSON', () => {
        it('should return correct object representation', () => {
            const car = new Car(undefined, 'Test Car', 2023, 50000);
            const json = car.toJSON();
            
            expect(json).toEqual({
                name: 'Test Car',
                year: 2023,
                price: 50000
            });
        });
    });
});
