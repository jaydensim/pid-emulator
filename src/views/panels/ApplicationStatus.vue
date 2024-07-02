<script setup lang="ts">

import PanelModule from '../../components/PanelModule.vue';

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
        <h3>{{ mappings[application.isAppFullyLoaded ? "ready" : "loading"] }}</h3>
        <p>Application</p>
      </div>
      <div>
        <h3>{{ mappings[application.loadState.emulators] }}</h3>
        <p>Emulators</p>
      </div>
      <div>
        <h3>{{ mappings[application.loadState.railroutes] }}</h3>
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