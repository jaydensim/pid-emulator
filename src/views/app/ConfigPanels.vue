<script setup lang="ts">

import ApplicationStatus from '../panels/ApplicationStatus.vue';
import ActorStatus from '../panels/ActorStatus.vue';
import VehicleStatus from '../panels/VehicleStatus.vue';
import SelectEmulator from '../panels/SelectEmulator.vue';
import SelectRoute from '../panels/SelectRoute.vue';
import EmulatorConfig from '../panels/EmulatorConfig.vue';

</script>


<template>
  <section>
    <ApplicationStatus />
    <SelectEmulator />
    <SelectRoute />
  </section>
  <section>
    <VehicleStatus />
    <ActorStatus />
  </section>
  <section>
    <EmulatorConfig />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-flow: column;
  gap: 10px;
}
</style>