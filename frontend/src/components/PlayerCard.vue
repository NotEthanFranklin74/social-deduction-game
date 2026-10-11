<template>
    <article
        class="player-card"
        :class="{
            'is-host': player.isHost,
            'is-eliminated': !player.isAlive,
            'is-selected': selected,
            'is-selectable': selectable && player.isAlive,
        }"
    >
        <div class="player-avatar">
            {{  player.name.trim().charAt(0).toUpperCase() || '?'  }}
        </div>

        <div class="player-info">
            <div class="player-name-row">
                <h3>{{  player.name  }}</h3>

                <span v-if="player.isHost" class="host-badge">HOST</span>
            </div> 

            <p class="player-status">{{  statusText  }}</p>
        </div>

        <div class="selection-indicator" v-if="selected">✓</div>

        <button
            v-if="selectable && player.isAlive"
            class="select-button"
            type="button"
            :aria-pressed="selected"
            :aria-label="`Select ${player.name}`"
            @click="$emit('select', player.id)"
        >
            {{  selected ? 'Selected' : 'Select'  }}
        </button>
    </article>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface PlayerCardData {
    id: string;
    name: string;
    isHost: boolean;
    isAlive: boolean;
    isReady?: boolean;
}

const props = withDefaults(defineProps<{
    player: PlayerCardData;
    selectable?: boolean;
    selected?: boolean;
    showReadyStatus?: boolean;
}>(), {
    selectable: false,
    selected: false,
    showReadyStatus: false,
});

defineEmits<{
    select: [playerId: string];
}>();

const statusText = computed(() => {
    if (!props.player.isAlive) return 'Eliminated';

    if (props.showReadyStatus) return props.player.isReady ? 'Ready' : 'Waiting';

    return 'Alive';
});
</script>

<style lang="css" scoped>
.player-card {
    display: flex;
    align-items: center;
    gap: 0.85rem;
    padding: 1rem;
    background: #1b1b1b;
    border: 1px solid #383838;
    border-radius: 10px;
    color: #f5f5f5;
    transition: border-color 0.2s, background 0.2s;
}

.player-card.is-host {
    border-color: #665322;
}

.player-card.is-selected {
    border-color: #ffd700;
    background: #292514;
}

.player-card.is-eliminated {
    opacity: 0.5;
    filter: grayscale(0.8);
}

.player-card.is-selectable {
    cursor: pointer;
}

.player-avatar {
    display: flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    border: 1px solid #665322;
    border-radius: 50%;
    background: #292313;
    color: #ffd700;
    font-size: 1.2rem;
    font-weight: 700;
}

.player-info {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.player-name-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 0.5rem;
}

.player-name-row h3 {
    margin: 0;
    overflow-wrap: anywhere;
    font-size: 1rem;
}

.host-badge {
    padding: 0.2rem 0.4rem;
    border-radius: 4px;
    background: #3b3216;
    color: #ffd700;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.05em;
}

.player-status {
    margin: 0.3rem 0 0;
    color: #aaa;
    font-size: 0.8rem;
    line-height: 1.2;
    min-height: 1em;
}

.selection-indicator {
    color: #ffd700;
    font-size: 1.3rem;
    font-weight: bold;
}

.select-button {
    padding: 0.45rem 0.7rem;
    border: 1px solid #665322;
    border-radius: 6px;
    background: transparent;
    color: #ffd700;
    cursor: pointer;
}

.select-button:hover {
    background: #3b3216;
}

.select-button:focus-visible {
    outline: 2px solid #ffd700;
    outline-offset: 3px;
}
</style>