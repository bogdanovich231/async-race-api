import Garage from './components/Garage';
import Winners from './components/Winners';
import './global.css'

class App {
    private garage: Garage;
    private winners: Winners;

    constructor() {
        this.garage = new Garage();
        this.winners = new Winners();
    }
    switchToGarageView(): void {
        const garageViewState = this.garage.getViewState();
    }

    switchToWinnersView(): void {
        const winnersViewState = this.winners.getViewState();
    }

}

const app = new App();