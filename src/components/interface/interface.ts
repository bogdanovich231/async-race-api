export interface Car {
    id: number;
    name: string;
    color: string;
}

export interface Winner {
    name: string;
    id: number;
    wins: number;
    time: number;
}

export interface GarageViewState {
    name: string;
    pageNumber: number;
    totalItems: number;
}

export interface WinnersViewState {
    name: string;
    pageNumber: number;
    totalItems: number;
}

