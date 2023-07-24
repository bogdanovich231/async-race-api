
export function animateCar(carId: number, speed: number): void {
    const carElement = document.getElementById(`car-${carId}`);

    if (!carElement) {
        console.error(`Car element with ID ${carId} not found.`);
        return;
    }

    const containerWidth = window.innerWidth * 0.9;
    const animationDuration = containerWidth / speed;

    let currentPosition = 0;
    let startTime: number;

    function step(timestamp: number) {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / animationDuration;
        currentPosition = progress * containerWidth;

        if (carElement) {
            carElement.style.transform = `translateX(${currentPosition}px)`;
        }

        if (currentPosition < containerWidth) {
            requestAnimationFrame(step);
        } else {
            resetCarAnimation(carId);
        }
    }

    requestAnimationFrame(step);
}

export function resetCarAnimation(carId: number): void {
    const carElement = document.getElementById(`car-${carId}`);

    if (!carElement) {
        console.error(`Car element with ID ${carId} not found.`);
        return;
    }

    carElement.style.transform = "translateX(0)";
}