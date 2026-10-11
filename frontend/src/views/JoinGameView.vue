<template>
    <main class="join-game">
        <h1>Join a game</h1>
        <p>Enter your details to join the investigation</p>

        <form @submit.prevent="joinGame">
            <label for="player-name">Your name</label>
            <input 
                id="player-name"
                v-model="playerName"
                placeholder="Enter your name"
                required
            />

            <label for="game-code">Game code</label>
            <input 
                id="game-code"
                v-model="gameCode"
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