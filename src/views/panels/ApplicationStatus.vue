<script setup lang="ts">
import PanelModule from '../../components/PanelModule.vue';
import LoaderSymbol from '@/components/LoaderSymbol.vue';
import { useApplication } from '../../stores/application';
const application = useApplication();


const mappings = {
  'ready': '🟢',
  'error': '🚫',
  'unloaded': '⭕',
  'loading': '🕑'
};

</script>


<template>
  <PanelModule title="Application Status">

    <section class="status">
      <div>
        <h3>
          <LoaderSymbol v-if="!application.isAppFullyLoaded" />
          <span v-else>{{ mappings["ready"] }}</span>
        </h3>
        <p>Application</p>
      </div>
      <div>
        <h3>
          <LoaderSymbol v-if="application.loadState.emulators == 'loading'" />
          <span v-else>{{ mappings[application.loadState.emulators] }}</span>
        </h3>
        <p>Emulators</p>
      </div>
      <div>
        <h3>
          <LoaderSymbol v-if="application.loadState.railroutes == 'loading'" />
          <span v-else>{{ mappings[application.loadState.railroutes] }}</span>
        </h3>
        <p>Rail routes</p>
      </div>
    </section>
  </PanelModule>
</template>

<style scoped>
section.status {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

section.status div {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 6px;
}
</style>