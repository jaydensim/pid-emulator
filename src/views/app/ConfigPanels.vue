<script setup lang="ts">

import ApplicationStatus from '../panels/ApplicationStatus.vue';
import ActorStatus from '../panels/ActorStatus.vue';
import VehicleStatus from '../panels/VehicleStatus.vue';
import SelectEmulator from '../panels/SelectEmulator.vue';
import SelectRoute from '../panels/SelectRoute.vue';

</script>


<template>
  <section>
    <ApplicationStatus />
    <SelectEmulator />
  </section>
  <section>
    <SelectRoute />
  </section>
  <section>
    <VehicleStatus />
    <ActorStatus />
  </section>
</template>

<style scoped>
section {
  display: flex;
  flex-flow: column;
  gap: 10px;
}
</style>