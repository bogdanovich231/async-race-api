import { Car } from "./interface/interface";
import { startCarEngine, stopCarEngine, driveCar } from "./Api";
import { animateCar, resetCarAnimation } from "./Animation";

export async function setupStartButton(car: Car): Promise<HTMLElement> {
    const startButton = document.createElement("button");
    startButton.textContent = "Запустить";
    startButton.disabled = car.isMoving;

    startButton.addEventListener("click", async () => {
        try {
            await startCarEngine(car.id);
            startButton.disabled = true;
            const data = await driveCar(car.id);

            if (!data.velocity || data.velocity <= 0) {
                resetCarAnimation(car.id);
                return;
            }

            animateCar(car.id, data.velocity);
        } catch (error) {
            console.error("Ошибка при запуске двигателя:", error);
            resetCarAnimation(car.id);
        }
    });

    return startButton;
}

export async function setupStopButton(car: Car): Promise<HTMLElement> {
    const stopButton = document.createElement("button");
    stopButton.textContent = "Остановить";
    stopButton.disabled = !car.isMoving;

    stopButton.addEventListener("click", async () => {
        try {
            await stopCarEngine(car.id);
            stopButton.disabled = true;
            resetCarAnimation(car.id);
        } catch (error) {
            console.error("Ошибка при остановке двигателя:", error);
        }
    });

    return stopButton;
}