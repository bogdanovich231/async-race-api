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

    const table = document.createElement('table');

    const tableHeader = document.createElement('tr');
    const headers = ['№', 'Car', 'Name', 'Wins', 'Best Time(seconds)'];
    headers.forEach((headerText) => {
        const header = document.createElement('th');
        header.textContent = headerText;
        tableHeader.appendChild(header);
    });
    table.appendChild(tableHeader);

    winners.forEach((winner, index) => {
        const row = document.createElement('tr');

        const numberCell = document.createElement('td');
        numberCell.textContent = `${index + 1}`;
        row.appendChild(numberCell);

        const carImageCell = document.createElement('td');
        carImageCell.textContent = 'car';
        row.appendChild(carImageCell);

        const nameCell = document.createElement('td');
        nameCell.textContent = winner.car ? winner.car.name : 'Unknown';
        row.appendChild(nameCell);

        const winsCell = document.createElement('td');
        winsCell.textContent = `${winner.wins}`;
        row.appendChild(winsCell);

        const bestTimeCell = document.createElement('td');
        bestTimeCell.textContent = `${winner.bestTime}`;
        row.appendChild(bestTimeCell);

        table.appendChild(row);
    });

    containerCar.appendChild(table);
}