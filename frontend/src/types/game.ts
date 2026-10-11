export interface LobbyPlayer {
    id: string;
    name: string;
    isHost: boolean;
}

export interface LobbyData {
    id: string;
    code: string;
    phase: string;
    players: LobbyPlayer[];
    settings: {
        minPlayers: number;
        maxPlayers: number;
        numberOfTraitors: number;
        discussionTimeSeconds: number;
        votingTimeSeconds: number;
    }
}