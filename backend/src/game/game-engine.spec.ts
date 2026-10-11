import { GameEngine } from "./game-engine.js"
import { GamePhase } from "./game-phase.enum.js";
import { GameRole } from "./game-role.enum.js";

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

    describe('startGame', () => {
        it('should reject starting a game that has already started', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            game.phase = GamePhase.VOTING;

            expect(() => engine.startGame(game)).toThrow('Game is already in progress.');
        });

        it('should reject starting a game with too few players', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');

            expect(() => engine.startGame(game)).toThrow('Not enough players to start the game.');
        })

        it('should start game correctly', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            engine.startGame(game);
        });
    })

    describe('getRoleReveal', () => {
        it('should reject if game hasn\'t started yet', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            expect(() => engine.getRoleReveal(game, game.players[0].id)).toThrow('Roles are not available yet.');
        });

        it('should reject if player does not exist', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            engine.startGame(game);

            expect(() => engine.getRoleReveal(game, 'invalid_string')).toThrow('Player or role not found.');
        });

        it('should reject if player\'s role does not exist', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            engine.startGame(game);

            game.players[0].role = null;

            expect(() => engine.getRoleReveal(game, game.players[0].id)).toThrow('Player or role not found.');
        });

        it('should reveal other traitors', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            engine.startGame(game);

            const traitor = game.players.find(traitor => traitor.role === GameRole.TRAITOR);

            expect(engine.getRoleReveal(game, traitor!.id).role).toBe(GameRole.TRAITOR);
            expect(engine.getRoleReveal(game, traitor!.id).traitorTeammates?.length).toBeGreaterThan(0);
        })

        it('should reveal your faithful role', () => {
            const game = engine.createGame();

            engine.addPlayer(game, 'Player1');
            engine.addPlayer(game, 'Player2');
            engine.addPlayer(game, 'Player3');
            engine.addPlayer(game, 'Player4');
            engine.addPlayer(game, 'Player5');
            engine.addPlayer(game, 'Player6');

            engine.startGame(game);

            const faithful = game.players.find(faithful => faithful.role === GameRole.FAITHFUL);

            expect(engine.getRoleReveal(game, faithful!.id).role).toBe(GameRole.FAITHFUL);
            expect(engine.getRoleReveal(game, faithful!.id).traitorTeammates).toBeUndefined();
        })
    })
})  