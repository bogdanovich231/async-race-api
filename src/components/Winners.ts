import { Winner, WinnersViewState } from './interface/interface';
import { winnerButton } from './CardCar';
import { addWin, getWin } from './Api';
import { renderWinners } from './WinnersRender';

export default class Winners {
    private winners: Winner[] = [];
    private state: WinnersViewState = {
        name: 'Winners',
        pageNumber: 1,
        totalItems: 0,
    };

    async addWinner(winner: Winner): Promise<void> {
        await addWin(winner);
        const existingWinner = this.winners.find((w) => w.car.id === winner.car.id);
        if (existingWinner) {
            existingWinner.wins++;
            existingWinner.bestTime = Math.min(existingWinner.bestTime, winner.bestTime);
        } else {
            this.winners.push(winner);
        }
        this.state.totalItems = this.winners.length;
        renderWinners(this.winners);
    }

    async loadWinners(): Promise<void> {
        this.winners = await getWin();
        this.state.totalItems = this.winners.length;
        renderWinners(this.winners);
    }

    getViewState(): WinnersViewState {
        return this.state;
    }

    showWinners(): void {
        renderWinners(this.winners);
    }

}

const win = new Winners();

winnerButton.addEventListener('click', () => {
    win.loadWinners();
});