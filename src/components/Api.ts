import { Car, DriveData, Winner } from './interface/interface';

const API_URL = 'http://localhost:3000';

export async function getCars(): Promise<Car[]> {
    try {
        const response = await fetch(`${API_URL}/garage`);
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

export async function startCarEngine(carId: number): Promise<{ velocity: number, distance: number }> {
    try {
        const response = await fetch(`${API_URL}/engine?id=${carId}&status=started`,
            {
                method: 'PATCH'
            });
        if (!response.ok) {
            throw new Error("Failed to start car engine.");
        }
        return response.json(); // Add return statement here
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
        return; // Add return statement here
    } catch (error) {
        console.error("Error stopping car engine:", error);
        throw error;
    }
}
export async function driveCar(carId: number): Promise<DriveData> {
    try {
        const response = await fetch(`${API_URL}/engine?id=${carId}&status=drive`, {
            method: "PATCH"
        });
        if (!response.ok) {
            throw new Error("Failed to start driving.");
        }
        const data = await response.json();
        return data as DriveData;
    } catch (error) {
        console.error("Error starting driving:", error);
        throw error;
    }
}