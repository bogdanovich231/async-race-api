import { Car } from './interface/interface';

const API_URL = 'http://localhost:3000';

export async function getCars(): Promise<Car[]> {
    const response = await fetch(`${API_URL}/garage`);
    const data = await response.json();
    return data;
}

export async function addCar(car: Car): Promise<void> {
    await fetch(`${API_URL}/garage`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    });
}


export async function deleteCar(carId: number): Promise<void> {
    await fetch(`${API_URL}/garage/${carId}`, {
        method: 'DELETE',
    });
}