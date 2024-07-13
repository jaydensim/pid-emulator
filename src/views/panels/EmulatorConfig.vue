<script setup lang="ts">
import { useLoaders } from '@/stores/loaders';
import { computed, type Component } from 'vue';
import PanelModule from '../../components/PanelModule.vue';
import { useRoute } from 'vue-router';
import LoaderSymbol from '@/components/LoaderSymbol.vue';
const loaders = useLoaders();


const route = useRoute();

const requestedId = computed(() => route.params.id as string);

const emulatorState = computed(() => {
  const emulator = loaders.emulators.get(requestedId.value);
  if (!emulator && loaders.emulators.size > 0) return "not-found";
  if (!emulator) return "awaiting-load";
  if (emulator.disabled) return "disabled";
  if (!emulator.configcomponent) return "no-config";
  else return "enabled";
});


const emulator = computed(() => {
  return loaders.emulators.get(requestedId.value) as { configcomponent: Component };
});
</script>


<template>
  <PanelModule title="Emulator Config">
    <Suspense :key="requestedId" v-if="emulatorState == 'enabled'">
      <template #fallback>
        <div class="overlay">
          <LoaderSymbol /> Loading {{ route.params.id }}
        </div>
      </template>
      <component :is="emulator.configcomponent" />
    </Suspense>

    <div class="overlay" v-else-if="emulatorState == 'not-found'">
      🚫 Emulator not found
    </div>

    <div class="overlay" v-else-if="emulatorState == 'awaiting-load'">
      <LoaderSymbol /> Loading emulators...
    </div>

    <div class="overlay" v-else-if="emulatorState == 'no-config'">
      🚫 Nothing to configure
    </div>

    <div class="overlay" v-else-if="emulatorState == 'disabled'">
      ⛔ Emulator disabled
    </div>
  </PanelModule>
</template>

<style scoped>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #8C8C8C;
}
</style>