import { animateCar, resetCarAnimation } from "./Animation";
import { startCarEngine, stopCarEngine } from "./Api";
import { Car } from "./interface/interface";

export async function startRace(cars: Car[]): Promise<void> {
    try {
        const promises = cars.map(async (car) => {
            if (!car.isMoving) {
                const data = await startCarEngine(car.id);
                if (data.velocity && data.distance > 0) {
                    await animateCar(car.id, data.velocity, data.distance);
                } else {
                    throw new Error('Error: The vehicle cannot start moving.');
                }
            }
        });

        await Promise.all(promises);
        console.log(promises)
    } catch (error) {
        console.error('Error at the start of the race:', error);
    }
}
export async function resetRace(cars: Car[]): Promise<void> {
    try {
        const promises = cars.map(async (car) => {
            if (car.isMoving) {
                await stopCarEngine(car.id);
            }
            resetCarAnimation(car.id);
        });

        await Promise.all(promises);
    } catch (error) {
        console.error('Error when resetting a race:', error);
    }
}