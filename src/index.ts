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

    // Switch to the garage view
    switchToGarageView(): void {
        const garageViewState = this.garage.getViewState();
        // Update the UI with the garage view state
        // ...
    }

    // Switch to the winners view
    switchToWinnersView(): void {
        const winnersViewState = this.winners.getViewState();
        // Update the UI with the winners view state
        // ...
    }

    // Other methods...
}

const app = new App();
// Initialize the app and set up event listeners
// ...
