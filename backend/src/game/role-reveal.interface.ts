import { GameRole } from "./game-role.enum.js";

export interface RoleReveal {
    role: GameRole;
    traitorTeammates?: {
        id: string;
        name: string;
    }[];
}