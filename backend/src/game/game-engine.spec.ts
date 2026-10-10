import { GameEngine } from "./game-engine.js"
import { GamePhase } from "./game-phase.enum.js";

describe('Game Engine', () => {
    let engine: GameEngine;

    beforeEach(() => {
        engine = new GameEngine();
    });

    describe('createGame', () => {
        it('should create a game in the lobby', () => {
            const game = engine.createGame();

            expect(game.id).toBeDefined();
            expect(game.phase).toBe(GamePhase.LOBBY);
            expect(game.roundNumber).toBe(0);
            expect(game.players).toHaveLength(0);
        });

        it('should add a player to the lobby', () => {
            const game = engine.createGame();

            const player = engine.addPlayer(game, 'Max');

            expect(player.name).toBe('Max');
            expect(player.isAlive).toBeTruthy();
            expect(game.players).toContain(player);
        });

        it('should reject an empty name', () => {
            const game = engine.createGame();

            expect(() => engine.addPlayer(game, ' ')).toThrow('Player name cannot be empty.');
        })

        it('should reject adding players when not in the lobby', () => {
            const game = engine.createGame();
            game.phase = GamePhase.FINISHED;

            expect(() => engine.addPlayer(game, 'Max')).toThrow('Players can only join a game in the lobby.');
        })
    });


})  