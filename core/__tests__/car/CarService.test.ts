import { describe, test, expect, beforeEach } from 'vitest'
import { Car } from '../../entities/Car'
import { CarService } from '../../services/Car'
import { CarRepositoryMock } from './CarMock'

describe('CarService', () => {
    let carService: CarService
    let carRepository: CarRepositoryMock

    beforeEach(() => {
        carRepository = new CarRepositoryMock()
        carService = new CarService(carRepository)
    })

    test('should create a new car', async () => {
        const carData = {
            id: '1',
            name: 'Fusion',
            year: 2020,
            price: 50000
        }

        await carService.create(carData)
        const savedCar = await carRepository.findOne({ id: '1' })

        console.log(savedCar)

        expect(savedCar).toBeDefined()
        expect(savedCar?.name).toBe('Fusion')
        expect(savedCar?.year).toBe(2020)
        expect(savedCar?.price).toBe(50000)
    })

    test('should find car by id', async () => {
        const car = new Car('1', 'Fusion', 2020, 50000)
        await carRepository.create(car)

        const foundCar = await carService.findOne({ id: '1' })

        expect(foundCar).toBeDefined()
        expect(foundCar?.id).toBe('1')
        expect(foundCar?.name).toBe('Fusion')
    })

    test('should return null when car is not found', async () => {
        const foundCar = await carService.findOne({ id: 'non-existent' })
        expect(foundCar).toBeNull()
    })

    test('should list all cars', async () => {
        const car1 = new Car('1', 'Fusion', 2020, 50000)
        const car2 = new Car('2', 'Civic', 2021, 60000)
        
        await carRepository.create(car1)
        await carRepository.create(car2)

        const cars = await carService.find()

        expect(cars).toHaveLength(2)
        expect(cars[0].name).toBe('Fusion')
        expect(cars[1].name).toBe('Civic')
    })
})