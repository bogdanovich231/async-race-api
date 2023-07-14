import { containerCar } from "./CardCar";
import { Winner } from "./interface/interface";

export function renderWinners(winners: Winner[]): void {
    containerCar.innerHTML = '';
    const winnersHeader = document.createElement('div');
    winnersHeader.className = 'winners_header';

    const pageTitle = document.createElement('h2');
    pageTitle.textContent = 'Winners';

    const winnerCount = document.createElement('span');
    winnerCount.textContent = `Winner Count: ${winners.length}`;

    winnersHeader.appendChild(pageTitle);
    winnersHeader.appendChild(winnerCount);
    containerCar.appendChild(winnersHeader);

    winners.forEach((winner: Winner, index: number) => {
        const winnerElement = document.createElement('div');
        winnerElement.className = "block_car";

        const carElement = document.createElement('div');
        carElement.className = "car_info";

        const placeElement = document.createElement('span');
        placeElement.className = "car_place";
        placeElement.textContent = `Place: ${index + 1}`;

        const nameElement = document.createElement('span');
        nameElement.className = "car_name";
        nameElement.textContent = `Name: ${winner.name}`;

        const timeElement = document.createElement('span');
        timeElement.className = "car_time";
        timeElement.textContent = `Time: ${winner.time} seconds`;

        carElement.appendChild(placeElement);
        carElement.appendChild(nameElement);
        carElement.appendChild(timeElement);

        winnerElement.appendChild(carElement);
        containerCar.appendChild(winnerElement);
    });
}