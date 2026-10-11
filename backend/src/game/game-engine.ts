import { randomInt, randomUUID } from "node:crypto";
import { GamePlayer, GameState } from "./game-state.interface.js";
import { GamePhase } from "./game-phase.enum.js";
import { GameRole } from "./game-role.enum.js";
import { RoleReveal } from "./role-reveal.interface.js";

export class GameEngine {
    createGame(): GameState {
        return {
            id: randomUUID(),
            phase: GamePhase.LOBBY,
            roundNumber: 0,
            players: [],
            settings: {
                minPlayers: 6,
                maxPlayers: 15,
                numberOfTraitors: 2,
                discussionTimeSeconds: 300,
                votingTimeSeconds: 60,
            },
        };
    }

    startGame(game: GameState) {
        if (game.phase !== GamePhase.LOBBY) {
            throw new Error('Game is already in progress.');
        }

        if (game.players.length < game.settings.minPlayers) {
            throw new Error('Not enough players to start the game.');
        }

        if(game.players.length > game.settings.maxPlayers) {
            throw new Error('Too many players to start the game.')
        }

        if (game.settings.numberOfTraitors < 1 || game.settings.numberOfTraitors >= game.players.length) {
            throw new Error('Invalid number of Traitors.')
        }

        game.phase = GamePhase.ROLE_ASSIGNMENT;

        const players = game.players;
        const numberOfTraitors = game.settings.numberOfTraitors;

        const shuffledPlayers = [...game.players];

        for (let i = shuffledPlayers.length - 1; i > 0; i--) {
            const j = randomInt(i + 1);

            [shuffledPlayers[i], shuffledPlayers[j]] = [shuffledPlayers[j], shuffledPlayers[i]];
        }

        for (const player of game.players) {
            player.role = null;
        };

        shuffledPlayers.forEach((player, index) => {
            player.role = 
                index < numberOfTraitors
                    ? GameRole.TRAITOR
                    : GameRole.FAITHFUL;
        });

        game.phase = GamePhase.STARTED;
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
            role: null,
        };

        game.players.push(player);

        return player;
    }

    getRoleReveal(game: GameState, playerId: string): RoleReveal {
        if (game.phase !== GamePhase.STARTED) {
            throw new Error('Roles are not available yet.');
        }

        const player = game.players.find(
            player => player.id === playerId,
        );

        if (!player || player.role == null) {
            throw new Error('Player or role not found.');
        }

        if (player.role === GameRole.FAITHFUL) {
            return {
                role: GameRole.FAITHFUL,
            };
        }

        const traitorTeammates = game.players
            .filter(
                other => 
                    other.role === GameRole.TRAITOR &&
                    other.id !== playerId,
            )
            .map(other => ({
                id: other.id,
                name: other.name,
            }));

        return {
            role: GameRole.TRAITOR,
            traitorTeammates,
        };
    }
}