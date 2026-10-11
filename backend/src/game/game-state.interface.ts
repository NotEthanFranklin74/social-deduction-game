import { GamePhase } from "./game-phase.enum.js";
import { GameRole } from "./game-role.enum.js";
import { GameSettings } from "./game-settings.interface.js";

export interface GamePlayer {
    id: string;
    name: string;
    isAlive: boolean;
    role: GameRole | null;
}

export interface GameState {
    id: string;
    phase: GamePhase;
    roundNumber: number;
    players: GamePlayer[];
    settings: GameSettings;
}