import { GamePhase } from "./game-phase.enum.js";

export interface GameState {
    id: string;
    phase: GamePhase;
    roundNumber: number;
}