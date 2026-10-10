import { randomUUID } from "node:crypto";
import { GamePlayer, GameState } from "./game-state.interface.js";
import { GamePhase } from "./game-phase.enum.js";

export class GameEngine {
    createGame(): GameState {
        return {
            id: randomUUID(),
            phase: GamePhase.LOBBY,
            roundNumber: 0,
            players: [],
        };
    }

    addPlayer(game: GameState, name: string): GamePlayer {
        if (game.phase !== GamePhase.LOBBY) {
            throw new Error('Players can only join a game in the lobby.');
        }

        const trimmedName = name.trim();

        if (!trimmedName) {
            throw new Error('Player name cannot be empty.');
        }

        const player: GamePlayer = {
            id: randomUUID(),
            name: trimmedName,
            isAlive: true,
        };

        game.players.push(player);

        return player;
    }
}