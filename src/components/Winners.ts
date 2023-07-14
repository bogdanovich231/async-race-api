import { Winner, WinnersViewState } from './interface/interface';
import { winnerButton, renderWinners } from './CardCar';
import { addWin, getWin } from './Api';

export default class Winners {
    private winners: Winner[] = [];
    private state: WinnersViewState = {
        name: 'Winners',
        pageNumber: 1,
        totalItems: 0,
    };

    async addWinner(winner: Winner): Promise<void> {
        await addWin(winner);
        this.winners.push(winner);
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
