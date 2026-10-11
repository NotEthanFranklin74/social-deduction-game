<template>
    <div class="game-timer">
        <p class="timer-label">TIME REMAINING</p>

        <p class="timer-display" :class="{  'timer-expired': remainingSeconds === 0  }">
            {{  formattedTime  }}
        </p>

        <div class="timer-controls">
            <button @click="start" :disabled="isRunning || remainingSeconds === 0">
                Start
            </button>

            <button @click="pause" :disabled="!isRunning">
                Pause
            </button>

            <button @click="reset">
                Reset
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed, onUnmounted, ref, watch } from 'vue';
const props = withDefaults(defineProps<{
    durationSeconds: number;
    autoStart?: boolean;
}>(), {
    autoStart: true,
});

const emit = defineEmits<{
    finished: [];
}>();

const remainingSeconds = ref(props.durationSeconds);
const isRunning = ref(false);

let intervalId: ReturnType<typeof setInterval> | undefined;

const formattedTime = computed(() => {
    const minutes = Math.floor(remainingSeconds.value / 60);
    const seconds = remainingSeconds.value % 60;

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
})

function start() {
    if(isRunning.value || remainingSeconds.value <= 0) return;

    isRunning.value = true;

    intervalId = setInterval(() => {
        remainingSeconds.value--;

        if (remainingSeconds.value <= 0) {
            remainingSeconds.value = 0;
            pause();
            emit('finished');
        }
    }, 1000);
}

function pause() {
    if (intervalId !== undefined) {
        clearInterval(intervalId);
        intervalId = undefined;
    }

    isRunning.value = false;
}

function reset() {
    pause();
    remainingSeconds.value = props.durationSeconds;
}

watch(() => props.durationSeconds, reset);

onUnmounted(() => {
    pause();
})

if(props.autoStart) {
    start();
}

defineExpose({ start, pause, reset });
</script>

<style lang="css" scoped>
.game-timer {
    text-align: center;
    padding: 1.5rem;
    border: 1px solid #665322;
    border-radius: 12px;
    background: #171717;
    color: #ffd700;
}

.timer-label {
    font-size: 0.8rem;
    letter-spacing: 0.2rem;
    color: #b8b8b8;
}

.timer-display {
    font-size: 3.5rem;
    font-weight: bold;
    font-variant-numeric: tabular-nums;
    margin: 1rem 0;
}

.timer-expired {
    color: #ff4d4d;
}

.timer-controls {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
}

.timer-controls button {
    padding: 0.5rem 1rem;
    border: 1px solid #665322;
    border-radius: 6px;
    background: #242424;
    color: #ffd700;
    cursor: pointer;
    margin-top: 15px;
}

.timer-controls button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
}
</style>