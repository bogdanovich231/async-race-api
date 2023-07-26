import { Car, DriveData } from "./interface/interface";
import { startCarEngine, stopCarEngine, driveCar } from "./Api";
import { animateCar, resetCarAnimation } from "./Animation";

export const carStates: Record<number, boolean> = {};

export async function setupStartButton(car: Car): Promise<HTMLElement> {
    const startButton = document.createElement("button");
    startButton.textContent = "A";
    startButton.className = "block_car_start_button";
    startButton.disabled = carStates[car.id];

    startButton.addEventListener("click", async () => {
        try {
            const driveData: DriveData = await startCarEngine(car.id);
            startButton.disabled = true;
            animateCar(car.id, driveData.velocity, driveData.distance);

            carStates[car.id] = true;

            const stopButtons = document.querySelectorAll(".block_car_stop_button") as NodeListOf<HTMLButtonElement>;
            for (let i = 0; i < stopButtons.length; i++) {
                stopButtons[i].disabled = false;
            }
        } catch (error) {
            console.error("Error starting the engine:", error);
            resetCarAnimation(car.id);
        }
    });

    return startButton;
}

export async function setupStopButton(car: Car): Promise<HTMLElement> {
    const stopButton = document.createElement("button");
    stopButton.textContent = "B";
    stopButton.className = "block_car_stop_button";
    stopButton.disabled = !carStates[car.id];

    stopButton.addEventListener("click", async () => {
        try {
            stopButton.disabled = true; // Disable after click
            await stopCarEngine(car.id);
            resetCarAnimation(car.id);

            carStates[car.id] = false;

            const startButton = document.querySelector(".block_car_start_button") as HTMLButtonElement;
            if (startButton) {
                startButton.disabled = false;
            }
        } catch (error) {
            console.error("Error stopping the engine:", error);
        }
    });

    return stopButton;
}