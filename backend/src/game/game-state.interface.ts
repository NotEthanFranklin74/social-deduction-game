import { GamePhase } from "./game-phase.enum.js";

export interface GamePlayer {
    id: string;
    name: string;
    isAlive: boolean;
}

export interface GameState {
    id: string;
    phase: GamePhase;
    roundNumber: number;
    players: GamePlayer[];
}