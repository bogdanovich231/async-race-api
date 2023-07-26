import { modelCar, names } from './NameCar';

export const genereteButton = document.createElement("button");
export const containerCar = document.createElement("div");
export const winnerButton = document.createElement("button");
export const viewGarage = document.createElement("button");

winnerButton.className = "car_winner"
genereteButton.className = "car_generate";
containerCar.className = "car_container";

viewGarage.innerHTML = "To Garage";
viewGarage.className = "garage_button";
genereteButton.innerHTML = "Generate";
winnerButton.innerHTML = "To Winner";

document.body.appendChild(viewGarage);
document.body.appendChild(winnerButton);
document.body.appendChild(containerCar);
document.body.appendChild(genereteButton);

export function getRandomCarName(): string {
    const randomNameIndex = Math.floor(Math.random() * names.length);
    const randomModelIndex = Math.floor(Math.random() * modelCar.length);

    const randomName = names[randomNameIndex];
    const randomModel = modelCar[randomModelIndex];

    return `${randomName} ${randomModel}`;
}

export function getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}