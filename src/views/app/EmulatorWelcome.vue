<script setup lang="ts">
import router from '@/router';
import { useApplication } from '../../stores/application';
import LoaderSymbol from '@/components/LoaderSymbol.vue';

const application = useApplication();

function goToFirstEmulator() {
  router.push("/sydneytrains:waratah1");
}
</script>

<template>
  <figure>
    <h3>Welcome!</h3>
    <p>This app simulates PID systems on rail vehicles. Get started by selecting a PID to emulate from the list in the
      lower-left corner, or by selecting the button below to load the first emulator. </p>

    <button @click="goToFirstEmulator()" :disabled="application.loadState.emulators !== 'ready'">
      <span v-if="application.loadState.emulators == 'ready'">Load an emulator</span>
      <span v-else>
        <LoaderSymbol /> Loading...
      </span>
    </button>
  </figure>
</template>

<style scoped>
figure {
  display: flex;
  flex-flow: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  height: 100%;
}

h3 {
  font-size: 1.5rem;
  font-weight: 500;
}

p {
  max-width: 500px;
  text-align: center;
}

button {
  padding: 6px 16px 8px 16px;
  background-color: var(--app-accent);
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  border: 2px solid var(--app-accent);
}

button:disabled {
  filter: saturate(0);
  opacity: 0.5;
  pointer-events: none;
}

button:hover {
  background-color: #fff;
  color: var(--app-accent);
}
</style>