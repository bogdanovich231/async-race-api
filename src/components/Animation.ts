import { driveCar, stopCarEngine } from "./Api";
import { containerCar } from "./CardCar";
import { Car } from "./interface/interface";

export async function animateCar(car: number, velocity: number, distance: number): Promise<void> {

    const carElement = document.getElementById(`car-${car}`);
    const blockWidthElement = document.getElementsByClassName("car_container")[0];

    if (!carElement) {
        console.error(`Car element with ID ${car} not found.`);
        return;
    }

    if (!blockWidthElement) {
        console.error("Block width element not found.");
        return;
    }

    let isAnimating = true; // Add a flag to control the animation state
    console.log('Car data:', car);

    try {
        const containerWidth = blockWidthElement.getBoundingClientRect().width;
        const animationDuration = distance / velocity;

        const carWidth = carElement.getBoundingClientRect().width;
        const maxPosition = containerWidth - carWidth;

        let currentPosition = 0;
        let startTime: number;
        let animationFrameId: number | null = null;

        carElement.style.transition = 'none';
        const step = function (timestamp: number) {
            if (!startTime) startTime = timestamp;
            const progress = (timestamp - startTime) / animationDuration;
            currentPosition = progress * containerWidth;

            if (carElement && isAnimating) { // Check if the animation is still ongoing
                carElement.style.transform = `translateX(${Math.min(currentPosition, maxPosition)}px)`;
            }

            if (currentPosition < containerWidth && isAnimating) { // Check if the animation is still ongoing
                animationFrameId = requestAnimationFrame(step);
            } else if (carElement) {
                carElement.style.transition = '';

                if (isAnimating) { // Check if the animation is still ongoing before calling driveCar
                    driveCar(car, velocity, distance)
                        .then((data) => {
                            if (data.status === 500) {
                                pauseCarAnimation(car);
                                console.warn(`Car ${car} encountered an error and should stop.`);
                            } else if (data.status === 200) {
                                isAnimating = false; // Animation is done, set the flag to false
                            } else {
                                console.warn(`Car ${car} animation was interrupted with status: ${data.status}.`);
                            }
                        })
                        .catch((error) => {
                            console.error("Error starting animation:", error);
                            resetCarAnimation(car);
                        });
                }
            }
        };

        animationFrameId = requestAnimationFrame(step);

        const stopButton = document.querySelector(".block_car_stop_button") as HTMLButtonElement;
        if (stopButton) {
            stopButton.addEventListener("click", () => {
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    isAnimating = false; // Animation is stopped, set the flag to false
                }
            });
        }
    } catch (error) {
        console.error("Error starting animation:", error);
        resetCarAnimation(car);
    }
}

export function pauseCarAnimation(carId: number): void {
    const carElement = document.getElementById(`car-${carId}`);
    if (carElement) {
        carElement.style.animationPlayState = 'paused';
    }
}
export function resetCarAnimation(carId: number): void {
    const carElement = document.getElementById(`car-${carId}`);
    if (carElement) {
        carElement.style.transform = '';
    }
}
let winnerDeclared = false;

export function declareWinner(car: Car): void {
    if (!winnerDeclared) {
        winnerDeclared = true;
        const winnerMessage = document.createElement('div');
        winnerMessage.textContent = `Winner: ${car.name}!`;
        winnerMessage.className = 'winner-message';

        winnerMessage.style.opacity = '0';
        containerCar.appendChild(winnerMessage);

        void winnerMessage.offsetWidth;

        winnerMessage.style.opacity = '1';

        setTimeout(() => {
            winnerMessage.style.opacity = '0';
            containerCar.removeChild(winnerMessage);
            winnerDeclared = false;
        }, 3000);
    }
}