<template>
    <section class="settings-panel">
        <h2>Game Settings</h2>

        <div class="setting">
            <div class="setting">
                <label>
                Minimum Players
                    <input 
                        v-model.number="settings.minPlayers"
                        type="number"
                        min="2"
                        :max="settings.maxPlayers"
                    />
                </label>
            </div>

            <div class="setting">
                <label>
                    Maximum Players
                    <input 
                        v-model.number="settings.maxPlayers"
                        type="number"
                        :min="settings.minPlayers"
                        max="15"
                    />
                </label>
            </div>

            <div class="setting">
                <label>
                    Number of Traitors
                    <input 
                        v-model.number="settings.numberOfTraitors"
                        type="number"
                        min="1"
                        :max="maxTraitors"
                    />
                </label>

                <p class="hint">
                    Traitors are assigned randomly when the game starts.
                </p>
            </div>

            <div class="setting">
                <label>
                    Discussion Time (seconds)
                    <input 
                        v-model.number="settings.discussionTimeSeconds"
                        type="number"
                        min="60"
                    />
                </label>
            </div>

            <div class="setting">
                <label>
                    Voting Time (seconds)
                    <input 
                        v-model.number="settings.votingTimeSeconds"
                        type="number"
                        min="60"
                    />
                </label>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { type GameSettings } from '../types/game';

const settings = defineModel<GameSettings>({
    required: true,
});

const maxTraitors = computed(() => 
    Math.max(1, settings.value.maxPlayers - 1)
);
</script>

<style lang="css" scoped>
.settings-panel {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    padding: 1.5rem;
    background: #1b1b1b;
    border: 1px solid #48401f;
    border-radius: 12px;
    color: #f5f5f5;
}

.settings-panel h2 {
    margin: 0;
    color: #ffd700;
    font-size: 1.4rem;
}

.setting {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.setting label {
    font-weight: 600;
    font-size: 0.9rem;
}

.setting input {
    width: 100%;
    box-sizing: border-box;
    padding: 0.75rem;
    border: 1px solid #494949;
    border-radius: 6px;
    background: #111;
    color: #f5f5f5;
    font: inherit;
}

.setting input:focus {
    outline: 2px solid #ffd700;
    outline-offset: 2px;
}

.hint {
    margin: 0;
    color: #aaa;
    font-size: 0.8rem;
    line-height: 1.5;
}
</style>