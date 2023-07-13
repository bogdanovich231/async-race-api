import { Car, GarageViewState } from './interface/interface';
import { genereteButton, getRandomName, getRandomColor, renderGarage } from './CardCar';
import { getCars, addCar } from './Api';

export default class Garage {
    private cars: Car[] = [];
    private state: GarageViewState = {
        name: 'Garage',
        pageNumber: 1,
        totalItems: 0,
    };

    async loadCars(): Promise<void> {
        this.cars = await getCars();
        this.state.totalItems = this.cars.length;
        renderGarage(this.cars);
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

