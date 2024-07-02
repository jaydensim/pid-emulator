<script setup lang="ts">
import { RouterView, useRoute } from 'vue-router'
import ConfigPanels from './views/app/ConfigPanels.vue';

import { useLoaders } from '@/stores/loaders';
import { useVehicle } from './stores/vehicle';
import { computed } from 'vue';
const loaders = useLoaders();
const vehicle = useVehicle();
const route = useRoute();


setTimeout(() => {
  loaders.bootstrap();
}, 500);

const requestedColour = computed(() => vehicle.vehicleRoute?.line.colour as string);
const currentAccentColour = computed(() => {
  return `${requestedColour.value || '#FF7A00'}`;
});



</script>

<template>
  <main>
    <section class="emulator">
      <RouterView />
    </section>
    <section class="panels">
      <ConfigPanels />
    </section>
  </main>
</template>

<style>
main * {
  --app-accent: v-bind(currentAccentColour);
}
</style>


<style scoped>
main {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;
  gap: 20px;
  padding: 20px;
}

.emulator {
  height: 400px;
}

.panels {
  display: flex;
  flex-flow: row;
  gap: 10px;
}
</style>