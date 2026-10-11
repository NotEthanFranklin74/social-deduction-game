<template>
    <main class="lobby">
        <header class="lobby-header">
            <div>
                <p class="eyebrow">THE GAME IS AFOOT</p>
                <h1>The Gathering</h1>
                <p class="subtitle">Prepare your players. Trust no one.</p>
            </div>

            <div class="game-code">
                <span>GAME CODE</span>
                <strong>{{ gameCode }}</strong>
            </div>
        </header>

        <section class="lobby-grid">
            <div class="panel players-panel">
                <div class="panel-heading">
                    <h2>Players</h2>
                    <span>{{  players.length  }} / {{  settings.maxPlayers  }}</span>
                </div>

                <div v-if="players.length === 0" class="empty-state">
                    <p>No players have joined yet.</p>
                    <p>Share the game code to invite them.</p>
                </div>

                <ul v-else class="player-list">
                    <li v-for="player in players" :key="player.id">
                        <div class="avatar">
                            {{  player.name.charAt(0).toUpperCase()  }}
                        </div>
                        <span>{{  player.name  }}</span>
                        <span v-if="player.isHost" class="host-label">
                            HOST
                        </span>
                    </li>
                </ul>

                <p class="hint">
                    Players will appear here when they join.
                </p>
            </div>

            <div class="panel settings-panel">
                <h2>Game Settings</h2>

                <label>
                    Minimum Players
                    <input 
                        v-model="settings.minPlayers"
                        type="number"
                        min="2"
                        :max="settings.maxPlayers"
                    />
                </label>

                <label>
                    Maximum Players
                    <input 
                        v-model="settings.maxPlayers"
                        type="number"
                        :min="settings.minPlayers"
                        max="15"
                    />
                </label>

                <label>
                    Number of Traitors
                    <input 
                        v-model="settings.numberOfTraitors"
                        type="number"
                        min="1"
                        :max="Math.max(1, players.length - 1)"
                    />
                </label>

                <label>
                    Discussion Time (seconds)
                    <input 
                        v-model="settings.discussionTimeSeconds"
                        type="number"
                        min="60"
                    />
                </label>

                <label>
                    Voting Time (seconds)
                    <input 
                        v-model="settings.votingTimeSeconds"
                        type="number"
                        min="60"
                    />
                </label>

                <button 
                    class="primary-button"
                    :disabled="!canStart"
                    @click="startGame"
                > 
                Begin the game
                </button>

                <p v-if="canStart" class="hint">
                    Add enough players and check your settings before starting.
                </p>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue';

interface LobbyPlayer {
    id: string;
    name: string;
    isHost: boolean;
}

const gameCode = ref('ABCD12');

const players = ref<LobbyPlayer[]>([
    { id: '1', name: 'Max', isHost: true },
    { id: '2', name: 'Emmie', isHost: false },
    { id: '3', name: 'Megan', isHost: false },
    { id: '4', name: 'Mum', isHost: false },
    { id: '5', name: 'Dad', isHost: false },
    { id: '6', name: 'Kira', isHost: false },
    { id: '7', name: 'Jamie', isHost: false },
]);

const settings = reactive({
    minPlayers: 6,
    maxPlayers: 15,
    numberOfTraitors: 2,
    discussionTimeSeconds: 300,
    votingTimeSeconds: 90,
});

const canStart = computed(() => {
    return (
        players.value.length >= settings.minPlayers &&
        players.value.length <= settings.maxPlayers &&
        settings.numberOfTraitors >= 1 &&
        settings.numberOfTraitors < players.value.length &&
        settings.discussionTimeSeconds >= 60 &&
        settings.votingTimeSeconds >= 60
    );
});

function startGame() {
    if (!canStart) return;

    alert('Ready to start game'); // TODO: Link to backend
}
</script>

<style lang="css" scoped>
.lobby {
    min-height: 100vh;
    padding: 3rem;
    background: #111114;
    color: #f5f2e9;
    font-family: Inter, system-ui, sans-serif;
}

.lobby-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin-bottom: 2rem;
}

.eyebrow {
    color: #d5b45b;
    font-size: 0.75rem;
    letter-spacing: 0.2em;
}

h1 {
    margin: 0.5rem 0;
    font-size: clamp(2rem, 5vw, 3,5rem);
}

.subtitle, .hint {
    color: #a7a5ad;
}

.game-code, .panel {
    border: 1px solid #38363e;
    border-radius: 16px;
    background: #1b1a20;
}

.game-code {
    padding: 1rem 1.5rem;
    text-align: center;
}

.game-code span, .game-code strong {
    display: block;
}

.game-code span {
    color: #a7a5ad;
    font-size: 0.7rem;
    letter-spacing: 0.15em;
}

.game-code strong {
    margin-top: 0.4rem;
    color: #e3c66d;
    font-size: 1.8rem;
    letter-spacing: 0.15em;
}

.lobby-grid {
    display: grid;
    grid-template-columns: 1.2fr 0.8fr;
    gap: 1.5rem;
    align-items: start;
}

.panel {
    padding: 1.5rem;
}

h2 {
    margin-top: 0;
}

.empty-state {
    padding: 3rem 1rem;
    text-align: center;
    color: #a7a5ad;
}

.player-list {
    padding: 0;
    list-style: none;
}

.player-list li {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid #333139;
}

.avatar {
    display: grid;
    place-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #39323a;
    color: #e3c66d;
    font-weight: 700;
}

.host-label {
    margin-left: auto;
    color: #e3c66d;
    font-size: 0.7rem;
}

.settings-panel label {
    display: grid;
    gap: 0.5rem;
    margin: 1.2rem 0;
    color: #d2cfd8;
}

.settings-panel input {
    box-sizing: border-box;
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #44414a;
    border-radius: 8px;
    background: #111114;
    color: #f5f2e9;
    font: inherit;
}

.primary-button {
    width: 100%;
    margin-top: 1rem;
    padding: 0.9rem;
    border: 0;
    border-radius: 8px;
    background: #d5b45b;
    color: #17150f;
    font: inherit;
    font-weight: 700;
    cursor: pointer;
}

.primary-button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}

@media (max-width: 760px) {
    .lobby {
        padding: 1.25rem;
    }

    .lobby-header {
        align-items: flex-start;
        flex-direction: column;
    }

    .lobby-grid {
        grid-template-columns: 1fr;
    }
}
</style>