import { Car, Winner } from './interface/interface';

const API_URL = 'http://localhost:3000';

export async function getCars(): Promise<Car[]> {
    const response = await fetch(`${API_URL}/garage`);
    const data = await response.json();
    return data;
}
export async function getWin(): Promise<Winner[]> {
    const response = await fetch(`${API_URL}/winners`);
    const data = await response.json();
    return data;
}
export async function addCar(car: Car): Promise<void> {
    await fetch(`${API_URL}/garage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car)
    });
}
export async function addWin(win: Winner): Promise<void> {
    await fetch(`${API_URL}/winners`, {
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

export async function updateCar(car: Car): Promise<void> {
    await fetch(`${API_URL}/garage/${car.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(car),
    });
}