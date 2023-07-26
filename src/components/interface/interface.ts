export interface Car {
    id: number;
    name: string;
    color: string;
    isMoving: boolean;

}

export interface Winner {
    id: number;
    car: Car;
    wins: number;
    bestTime: number;
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
    status: number;

}

export interface AnimationState {
    carId: number;
    animationFrameId: number | null;
    startTime: number;
    currentPosition: number;
    animationDuration: number;
}
