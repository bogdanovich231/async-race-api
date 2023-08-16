import { containerCar, genereteButton, getRandomCarName } from "./CardCar";
import { garage } from "./Garage";
import { Car } from "./interface/interface";
import { deleteCar, updateCar } from './Api';
import { setupStartButton, setupStopButton } from "./EngineButton";
import { resetRace, startRace } from "./Race";
import carSvg from "../svg/car.svg"

export function renderGarage(cars: Car[], currentPage: number, pageCount: number): void {
    containerCar.innerHTML = '';

    const garageHeader = document.createElement('div');
    garageHeader.className = 'garage_header';

    const pageTitle = document.createElement('h2');
    pageTitle.textContent = 'Garage';

    const carCount = document.createElement('span');
    carCount.textContent = `Car Count: ${garage.getCars().length}`;
    garageHeader.appendChild(pageTitle);
    garageHeader.appendChild(carCount);
    containerCar.appendChild(garageHeader);

    const createCarForm = document.createElement('div');
    createCarForm.className = 'create_car_form';

    const nameLabel = document.createElement('label');

    const nameInput = document.createElement('input');
    nameInput.type = 'text';

    const colorLabel = document.createElement('label');

    const colorInput = document.createElement('input');
    colorInput.type = 'color';
    let currentId = 1;
    function generateId(): number {
        return currentId++;
    }
    const createButton = document.createElement('button');
    createButton.textContent = 'Create';

    createButton.addEventListener('click', () => {
        const name = nameInput.value || getRandomCarName(); 
        const color = colorInput.value;
        const id = generateId();
        if (name && color) {
            const newCar: Car = {
                id,
                name,
                color,
                isMoving: false,
            };
            garage.addCar(newCar);
        }
    });

    createCarForm.appendChild(nameLabel);
    createCarForm.appendChild(nameInput);
    createCarForm.appendChild(colorLabel);
    createCarForm.appendChild(colorInput);
    createCarForm.appendChild(createButton);

    containerCar.appendChild(createCarForm);

    const editForm = document.createElement('div');
    editForm.className = 'edit_form';

    const editNameLabel = document.createElement('label');

    const editNameInput = document.createElement('input');
    editNameInput.type = 'text';
    editNameInput.className = 'edit_name_input';

    const editColorLabel = document.createElement('label');

    const editColorInput = document.createElement('input');
    editColorInput.type = 'color';
    editColorInput.className = 'edit_color_input';

    const updateButton = document.createElement('button');
    updateButton.textContent = 'Update';
    updateButton.addEventListener('click', async () => {
        const newName = editNameInput.value;
        const newColor = editColorInput.value;
        if (newName && newColor && selectedCar) {
            const updatedCar: Car = {
                ...selectedCar,
                name: newName,
                color: newColor,
            };
            await updateCar(updatedCar);
            garage.loadCars();
        }
    });
    const raceButton = document.createElement('button');
    raceButton.textContent = 'Начать гонку';
    raceButton.addEventListener('click', () => {
        startRace(cars);
    });

    const resetButton = document.createElement('button');
    resetButton.textContent = 'Сбросить';
    resetButton.addEventListener('click', () => {
        resetRace(cars);
    });
    editForm.appendChild(editNameLabel);
    editForm.appendChild(editNameInput);
    editForm.appendChild(editColorLabel);
    editForm.appendChild(editColorInput);
    editForm.appendChild(updateButton);

    containerCar.appendChild(editForm);
    containerCar.appendChild(raceButton);
    containerCar.appendChild(resetButton);
    containerCar.appendChild(genereteButton)
    let selectedCar: Car | null = null;
    cars.forEach((car: Car) => {

        const carElement = document.createElement('div');
        carElement.className = "block_car";

        const carSvgBlock = document.createElement('div');
        carSvgBlock.className = "block_car_svg";
        carSvgBlock.id = `car-${car.id}`;
carSvgBlock.innerHTML = carSvg;
carSvgBlock.style.color=car.color;
        const startButtonPromise = setupStartButton(car);
        const stopButtonPromise = setupStopButton(car);

        Promise.all([startButtonPromise, stopButtonPromise])
            .then(([startEngineButton, stopEngineButton]) => {
                carElement.appendChild(startEngineButton);
                carElement.appendChild(stopEngineButton);
            })
            .catch((error) => {
                console.error("Error setting up buttons:", error);
            });

        const selectButton = document.createElement('button');
        selectButton.textContent = 'Select';
        selectButton.addEventListener('click', () => {
            selectedCar = car;
            editNameInput.value = car.name;
            editColorInput.value = car.color;
        });

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Remove';
        deleteButton.addEventListener('click', async () => {
            await deleteCar(car.id);
            garage.loadCars();
        });

        carElement.innerHTML = `<span>${car.name}</span>`;

        carElement.prepend(selectButton);
        carElement.prepend(deleteButton);
        carSvgBlock.innerHTML = `${carSvg}`;
        carElement.appendChild(carSvgBlock);
        containerCar.appendChild(carElement);

    });

    const pagination = document.createElement('div');
    pagination.className = 'pagination';

    const currentPageInfo = document.createElement('span');
    currentPageInfo.textContent = `Page ${currentPage} of ${pageCount}`;

    containerCar.appendChild(pagination);
    const previousButton = document.createElement('button');
    previousButton.textContent = '<';
    previousButton.addEventListener('click', () => {
        garage.previousPage();
    });
    pagination.appendChild(previousButton);

    pagination.appendChild(currentPageInfo);

    const nextButton = document.createElement('button');
    nextButton.textContent = '>';
    nextButton.addEventListener('click', () => {
        garage.nextPage();
    });
    pagination.appendChild(nextButton);
}
