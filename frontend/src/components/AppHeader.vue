<template>
    <header class="app-header">
        <RouterLink to="/" class="brand">
            <span class="brand-icon">TG</span>
            <span>The Gathering</span>
        </RouterLink>

        <div class="lobby-info" v-if="gameCode">
            <span class="player-count">
                {{  playerCount  }} / {{  maxPlayers  }}
            </span>

            <button
                class="game-code"
                @click="copyGameCode"
                title="Copy game code"
            >
                {{  gameCode  }}
                <span>⧉</span>
            </button>
        </div>

        <div class="player-menu">
            <span class="player-name">{{  playerName  }}</span>
            <button
                class="avatar"
                aria-label="Open player menu"
                @click="menuOpen = !menuOpen"
            >
                {{  playerInitial  }}
            </button>

            <div class="dropdown" v-if="menuOpen">
                <RouterLink to="/how-to-play">How to Play</RouterLink>
                <button @click="menuOpen = false">Close Menu</button>
            </div>
        </div>
    </header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(defineProps<{
    playerName?: string;
    gameCode?: string;
    playerCount?: number;
    maxPlayers?: number;
}>(), {
    playerName: 'Player',
    gameCode: 'ABCD12',
    playerCount: 1,
    maxPlayers: 15,
});

const menuOpen = ref(false);

const playerInitial = computed(() => 
    props.playerName.trim().charAt(0).toUpperCase() || '?'
);

async function copyGameCode() {
    if(!props.gameCode) return;

    try {
        await navigator.clipboard.writeText(props.gameCode);
    } catch {
        // Clipboard access is unavailable. Add in feedback
    }
}
</script>

<style lang="css" scoped>
.app-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    padding: 1rem 1.5rem;
    background: #151515;
    border-bottom: 1px solid #665322;
    color: #f5f5f5;
}

.brand {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    color: #ffd700;
    font-weight: 800;
    letter-spacing: 0.12rem;
    text-decoration: none;
}

.brand-icon {
    font-size: 1.5rem;
}

.lobby-info, .player-menu{
    display: flex;
    align-items: center;
    gap: 0.75rem;
}

.player-count {
    color: #b8b8b8;
    font-size: 0.85rem;
}

.game-code {
    display: flex;
    gap: 0.5rem;
    align-items: center;
    padding: 0.5rem 0.75rem;
    border: 1px solid #665322;
    border-radius: 6px;
    background: #242424;
    color: #ffd700;
    cursor: pointer;
}

.avatar {
    width: 2.5rem;
    height: 2.5rem;
    border: 1px solid #ffd700;
    border-radius: 50%;
    background: #292313;
    color: #ffd700;
    cursor: pointer;
}

.player-menu {
    position: relative;
}

.dropdown {
    position: absolute;
    z-index: 10;
    top: calc(100% + 0.75rem);
    right: 0;
    display: grid;
    min-width: 150px;
    padding: 0.5rem;
    gap: 0.25rem;
    border: 1px solid #665322;
    border-radius: 8px;
    background: #202020;
}

.dropdown a, .dropdown button {
    padding: 0.6rem;
    border: 0;
    background: transparent;
    color: #f5f5f5;
    text-align: left;
    text-decoration: none;
    cursor: pointer;
}

.dropdown a:hover, .dropdown button:hover {
    background: #333;
}

@media (max-width: 600px) {
    .app-header {
        padding: 0.75rem;
        flex-wrap: wrap;
    }

    .player-name, .player-count {
        display: none;
    }
}
</style>