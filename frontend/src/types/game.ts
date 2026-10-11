export interface LobbyPlayer {
    id: string;
    name: string;
    isHost: boolean;
    isAlive: boolean;
}

export interface GameSettings {
    minPlayers: number;
    maxPlayers: number;
    numberOfTraitors: number;
    discussionTimeSeconds: number;
    votingTimeSeconds: number;
}

export interface LobbyData {
    id: string;
    code: string;
    phase: GamePhase;
    players: LobbyPlayer[];
    settings: GameSettings;
}

type GamePhase =
    | 'LOBBY'
    | 'ROLE_ASSIGNMENT'
    | 'STARTED'
    | 'MISSION'
    | 'DISCUSSION'
    | 'VOTING'
    | 'FINISHED'