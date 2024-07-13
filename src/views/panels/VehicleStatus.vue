<script setup lang="ts">

import PanelModule from '../../components/PanelModule.vue';

import { useVehicle } from '../../stores/vehicle';
const vehicle = useVehicle();


const movementMapping = {
  'stopped': "🛑",
  'departing': "🛫",
  'moving': "🛤️",
  'arriving': "🛬",
};

const doorMapping = {
  'closed': ["⛔", 'Doors closed'],
  'opening': ["↔️", 'Opening'],
  'open': ["🔼", "Doors open"],
  'closing': ["⚠️", 'Closing'],
};

const safetyCircuitMapping = {
  'safe': "🔒",
  'unsafe': "🔓",
};

</script>


<template>
  <PanelModule title="Emulated Vehicle Status">
    <section class="status">
      <div>
        <h3>{{ movementMapping[vehicle.vehicleMotionState] }}</h3>
        <p>{{ vehicle.vehicleMotionState.split("").map((c, i) => i == 0 ? c.toLocaleUpperCase() : c).join("") }}</p>
      </div>
      <div>
        <h3>{{ doorMapping[vehicle.vehicleDoorState][0] }}</h3>
        <p>{{ doorMapping[vehicle.vehicleDoorState][1] }}</p>
      </div>
      <div>
        <h3>{{ safetyCircuitMapping[vehicle.vehicleSafetyState] }}</h3>
        <p>Interlock</p>
      </div>
    </section>
    <hr />
    <section>
      <p>
        <b>{{ vehicle.vehicleNextStops.length }}</b>
        {{ vehicle.vehicleNextStops.length == 1 ? "stop" : "stops" }}
        remaining.

        The next stop is <b>{{ vehicle.vehicleNextStops[0] }}</b>{{ vehicle.vehicleNextStops.length < 2 ? "." : "," }}
          <span v-if="vehicle.vehicleNextStops.length >= 3">followed by
          <b>{{ vehicle.vehicleNextStops.length - 2 }}</b>
          {{ vehicle.vehicleNextStops.length == 3 ? "stop" : "stops" }} before {{
            vehicle.vehicleNextStops[vehicle.vehicleNextStops.length - 1] }}.
          </span>
          <span v-else-if="vehicle.vehicleNextStops.length == 2">followed by <b>{{
            vehicle.vehicleNextStops[vehicle.vehicleNextStops.length - 1] }}</b>.
          </span>
      </p>
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

b {
  font-weight: 600;
}
</style>