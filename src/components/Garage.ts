import { Car, GarageViewState } from './interface/interface';
import { genereteButton, getRandomCarName, getRandomColor } from './CardCar';
import { addCar, getCars } from './Api';
import { viewGarage } from './CardCar';
import { renderGarage } from './GarageRender';

export default class Garage {
    private cars: Car[] = [];
    private state: GarageViewState = {
        name: 'Garage',
        pageNumber: 1,
        totalItems: 0,
    };

    public itemsPerPage = 7;
    private currentPage: number = 1;

    async loadCars(): Promise<void> {
        this.cars = await getCars();
        this.state.totalItems = this.cars.length;
        this.showPage(this.currentPage);
    }

    async addCar(car: Car): Promise<void> {
        await addCar(car);
        this.cars.push(car);
        this.state.totalItems = this.cars.length;
    }

    getViewState(): GarageViewState {
        return this.state;
    }

    getCars(): Car[] {
        return this.cars;
    }

    getPageCount(): number {
        return Math.ceil(this.state.totalItems / this.itemsPerPage);
    }

    showPage(pageNumber: number): void {
        const startIndex = (pageNumber - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const carsOnPage = this.cars.slice(startIndex, endIndex);
        const pageCount = this.getPageCount();
        renderGarage(carsOnPage, pageNumber, pageCount);
        this.currentPage = pageNumber;
    }

    public nextPage(): void {
        if (this.currentPage < this.getPageCount()) {
            this.currentPage++;
            this.showPage(this.currentPage);
        }
    }

    public previousPage(): void {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.showPage(this.currentPage);
        }
    }
}

export const garage = new Garage();

viewGarage.addEventListener('click', async () => {
    garage.showPage(1);
});

genereteButton.addEventListener('click', async () => {
    for (let i = 0; i < 100; i++) {
        const car: Car = {
            name: getRandomCarName(),
            color: getRandomColor(),
            id: garage.getCars().length + 1,
            isMoving: true,
        };
        await garage.addCar(car);
    }
});
garage.loadCars();
