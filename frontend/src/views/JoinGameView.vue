<template>
    <main class="join-game">
        <h1>Join a game</h1>
        <p>Enter your details to join the investigation</p>

        <form @submit.prevent="joinGame">
            <label for="player-name">Your name</label>
            <input 
                id="player-name"
                v-model="playerName"
                type="text"
                placeholder="Enter your name"
                autocomplete="nickname"
                required
            />

            <label for="game-code">Game code</label>
            <input 
                id="game-code"
                v-model="gameCode"
                type="text"
                autocomplete="off"
                @update:model-value="gameCode = gameCode.toUpperCase()"
                placeholder="e.g. ABCD12"
                maxlength="6"
                required
            />
            
            <p v-if="errorMessage" class="error">
                {{  errorMessage  }}
            </p>

            <button type="submit">Join Game</button>
        </form>
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const playerName = ref('');
const gameCode = ref('');
const errorMessage = ref('');

function joinGame() {
    errorMessage.value = '';

    const valid = true; // TODO: Replace with game lookup

    if (!valid) {
        errorMessage.value = 'Game not found.';
        return;
    }

    // TODO: Register player to game

    router.push(`/game/${gameCode.value}`);
}
</script>

<style lang="css" scoped>
.join-game {
    min-height: calc(100vh - 80px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    background: #111111;
    color: #f5f5f5;
    box-sizing: border-box;
}

.join-game h1 {
    margin: 0 0 0.75rem;
    color: #ffd700;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: 0.08em;
    text-align: center;
    text-transform: uppercase;
}

.join-game > p {
    margin: 0 0 2rem;
    color: #b8b8b8;
    font-size: 1rem;
    line-height: 1.6;
    text-align: center;
}

.join-game form {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    width: 100%;
    max-width: 420px;
    padding: 2rem;
    box-sizing: border-box;
    background: #1b1b1b;
    border: 1px solid #49401f;
    border-radius: 12px;
    box-shadow: 0 12px 40px rgb(0 0 0 / 30%);
}

.join-game label {
    margin-top: 0.5rem;
    color: #e5e5e5;
    font-size: 0.9rem;
    font-weight: 600;
}

.join-game input {
    width: 100%;
    padding: 0.85rem 1rem;
    box-sizing: border-box;
    background: #111111;
    border: 1px solid #444444;
    border-radius: 6px;
    color: #ffffff;
    font: inherit;
    outline: none;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.join-game input::placeholder {
    color: #777777;
}

.join-game input:focus {
    border-color: #ffd700;
    box-shadow: 0 0 0 3px rgb(255 215 0 / 12%);
}

#game-code {
    text-transform: uppercase;
    letter-spacing: 0.2em;
    font-weight: 700;
}

.join-game .error {
    margin: 0.25rem -0;
    color: #ff6b6b;
    font-size: 0.9rem;
}

.join-game button[type="submit"] {
    margin-top: 1rem;
    padding: 0.95rem 1rem;
    background: #ffd700;
    border: 1px solid #ffd700;
    border-radius: 6px;
    color: #171717;
    font: inherit;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
}

.join-game button[type="submit"]:hover {
    background: #ffe766;
    box-shadow: 0 4px 20px rgb(255 215 0 / 15%);
    transform: translateY(-1px);
}

.join-game button[type="submit"]:active {
    transform: translateY(0);
}

.join-game button[type="submit"]:focus-visible {
    outline: 2px solid #ffffff;
    outline-offset: 4px;
}

@media (max-width: 480px) {
    .join-game {
        padding: 1.5rem 1rem;
    }
    
    .join-game form {
        padding: 1.5rem;
    }

    .join-game > p {
        max-width: 300px;
    }
}
</style>