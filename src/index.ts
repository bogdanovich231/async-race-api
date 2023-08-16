import Garage from "./components/Garage";
import Winners from './components/Winners';
import './global.css'

class App {
    private garage: Garage;

    private winners: Winners;

    constructor() {
        this.garage = new Garage();
        this.winners = new Winners();
    }
}
