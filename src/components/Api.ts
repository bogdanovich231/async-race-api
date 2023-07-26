import { pauseCarAnimation } from './Animation';
import { renderGarage } from './GarageRender';
import { Car, DriveData, Winner } from './interface/interface';

const API_URL = 'http://localhost:3000';

export async function getCars(): Promise<Car[]> {
    try {
        const response = await fetch(`${API_URL}/garage`, {
            method: 'GET'
        });
        if (!response.ok) {
            throw new Error("Failed to fetch cars.");
        }
        return await response.json();
    } catch (error) {
        console.error("Error fetching cars:", error);
        throw error;
    }
}
export async function getWin(): Promise<Winner[]> {
    const response = await fetch(`${API_URL}/winners`);
    const data = await response.json();
    return data;
}
export async function addCar(car: Car): Promise<Car> {
    try {
        const response = await fetch(`${API_URL}/garage?id=${car.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        });

        if (!response.ok) {
            throw new Error('Failed to add a car to the server.');
        }

        const addedCar: Car = await response.json();
        return addedCar;
    } catch (error) {
        console.error('Error when adding a vehicle:', error);
        throw error;
    }
}
export async function addWin(win: Winner): Promise<void> {
    await fetch(`${API_URL}/winners`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(win)
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

export async function startCarEngine(carId: number): Promise<DriveData> {
    try {
        const response = await fetch(`${API_URL}/engine?id=${carId}&status=started`, {
            method: 'PATCH'
        });

        if (!response.ok) {
            throw new Error("Failed to start car engine.");
        }

        const data = await response.json();
        const driveData: DriveData = { velocity: data.velocity, distance: data.distance, status: 200 };

        return driveData;
    } catch (error) {
        console.error("Error starting car engine:", error);
        throw error;
    }

}

export async function stopCarEngine(carId: number): Promise<void> {
    try {
        const response = await fetch(`${API_URL}/engine?id=${carId}&status=stopped`,
            {
                method: 'PATCH'
            });
        if (!response.ok) {
            throw new Error("Failed to stop car engine.");
        }
        return;
    } catch (error) {
        console.error("Error stopping car engine:", error);
        throw error;
    }
}
export async function driveCar(carId: number, velocity: number, distance: number): Promise<DriveData> {
    try {
        const response = await fetch(`${API_URL}/engine?id=${carId}&status=drive`,
            {
                method: 'PATCH'
            });
        if (!response.ok) {
            throw new Error("Failed to stop car engine.");
        }
        const data = { velocity, distance, status: 200 };

        if (!data.velocity || typeof data.velocity !== "number" || data.velocity <= 0 ||
            !data.distance || typeof data.distance !== "number" || data.distance <= 0) {
            throw new Error(`Invalid drive data received for car ${carId}.`);
        }

        return { ...data } as DriveData;
    } catch (error) {
        console.error("Error starting driving:", error);
        pauseCarAnimation(carId);
        return { velocity, distance, status: 500 } as DriveData;
    }
}