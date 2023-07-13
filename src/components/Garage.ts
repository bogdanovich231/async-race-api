import { Car, GarageViewState } from './interface/interface';
import { genereteButton, renderGarage, getRandomName, getRandomColor } from './CardCar';
import { addCar } from './Api';

export default class Garage {
    private cars: Car[] = [
        {
            "name": "Tesla",
            "color": "#e6e6fa",
            "id": 1
        },
        {
            "name": "BMW",
            "color": "#fede00",
            "id": 2
        },
        {
            "name": "Mersedes",
            "color": "#6c779f",
            "id": 3
        },
        {
            "name": "Ford",
            "color": "#ef3c40",
            "id": 4
        },
        {
            "name": "Chevrolet",
            "color": "#B67FF2",
            "id": 5
        },
    ];
    private state: GarageViewState = {
        name: 'Garage',
        pageNumber: 1,
        totalItems: 0,
    };

    async loadCars(): Promise<void> {
        this.state.totalItems = this.cars.length;
        renderGarage(this.cars.slice(0, 4));
    }

    async addCar(car: Car): Promise<void> {
        await addCar(car);
        this.cars.push(car);
        this.state.totalItems = this.cars.length;
        renderGarage(this.cars);
    }

    getViewState(): GarageViewState {
        return this.state;
    }

    getCars(): Car[] {
        return this.cars;
    }
}

const garage = new Garage();

genereteButton.addEventListener('click', async () => {
    for (let i = 0; i < 100; i++) {
        const car: Car = {
            name: getRandomName(),
            color: getRandomColor(),
            id: garage.getViewState().totalItems + 1,
        };
        await garage.addCar(car);
    }
});

garage.loadCars();
