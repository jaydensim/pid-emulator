<script setup lang="ts">
import { useLoaders } from '@/stores/loaders';
import { computed, type Component } from 'vue';
import { useRoute } from 'vue-router';
const loaders = useLoaders();

const route = useRoute();

const requestedId = computed(() => route.params.id as string);

const emulatorState = computed(() => {
  const emulator = loaders.emulators.get(requestedId.value);
  if (!emulator) return "not-found";
  if (emulator.disabled) return "disabled";
  else return "enabled";
});


const emulator = computed(() => {
  return loaders.emulators.get(requestedId.value) as { component: Component };
});
</script>


<template>
  <Suspense :key="requestedId" v-if="emulatorState == 'enabled'">
    <template #fallback>
      <div class="overlay">
        <span class="emoji">🕑</span>
        <span>Loading {{ route.params.id }}</span>
      </div>
    </template>
    <component :is="emulator.component" />
  </Suspense>

  <div class="overlay" v-else-if="emulatorState == 'not-found'">
    <span class="emoji">🚫</span>
    <span>The emulator {{ route.params.id }} could not be found.</span>
  </div>

  <div class="overlay" v-else-if="emulatorState == 'disabled'">
    <span class="emoji">⛔</span>
    <span>The emulator {{ route.params.id }} has been disabled.</span>
  </div>
</template>

<style scoped>
.overlay {
  display: flex;
  flex-flow: column;
  align-items: center;
  gap: 10px;
  height: 100%;
  justify-content: center;
}

span.emoji {
  font-size: 2em;
}
</style>