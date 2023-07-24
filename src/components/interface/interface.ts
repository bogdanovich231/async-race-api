export interface Car {
    id: number;
    name: string;
    color: string;
    isMoving: boolean;
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
export interface DriveData {
    velocity: number;
    distance: number;
}
