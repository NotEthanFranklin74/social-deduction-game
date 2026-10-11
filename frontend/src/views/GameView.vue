<template>
    <main>
        <h1>Discussion Phase</h1>

        <GameTimer
            :duration-seconds="10"
            @finished="endDiscussion"
        />
    </main>
</template>

<script setup lang="ts">
import GameTimer from '../components/GameTimer.vue';

function endDiscussion() {
    console.log('Discussion has ended');
}
</script>
