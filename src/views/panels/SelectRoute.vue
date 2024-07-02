<script setup lang="ts">
import { useVehicle } from '@/stores/vehicle';
import PanelModule from '../../components/PanelModule.vue';

import { useLoaders } from '@/stores/loaders';
import type { Railroute } from '@/types/Railroute';
const loaders = useLoaders();
const vehicle = useVehicle()

function setRoute(routeId: string) {
  const newRoute = loaders.railroutes.get(routeId) as unknown as Railroute;
  vehicle.setVehicleRoute(newRoute);
}
</script>


<template>
  <PanelModule title="Select Route" height="300">
    <ul v-if="loaders.railroutes.size !== 0">
      <li v-for="route of loaders.railroutes" :key="route[0]" :data-selected="route[0] == vehicle.vehicleRoute?.id"
        @click="setRoute(route[0])">
        <div class="row">
          <p class="icon" :style="{ backgroundColor: route[1].line.colour, color: route[1].line.textcolour }">
            <span>{{ route[1].line.short }}</span>
          </p>
          <div class="hstack">
            <h6>{{ route[1].name }}</h6>
            <p>
              {{ route[1].stations[0] }},
              then {{ route[1].stations.length - 2 }} stops to
              {{ route[1].headsign.join(" ") }}</p>
          </div>
        </div>
      </li>
    </ul>
    <div class="empty" v-else>
      Waiting for routes to load...
    </div>
  </PanelModule>
</template>

<style scoped>
ul {
  list-style: none;
  display: flex;
  flex-flow: column;
  gap: 8px;
  max-height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
}

li {
  background-color: #ffffff;
  padding: 6px 8px 8px;
  border-radius: 6px;
  cursor: pointer;
  border: 2px solid transparent;
  position: relative;
}

li:before {
  content: "";
  background-color: #ffffff;
  width: calc(100% + 4px);
  height: calc(100% + 4px);
  display: block;
  position: absolute;
  left: -2px;
  top: -2px;
  z-index: 0;
  border-radius: 6px;
}

li:hover {
  opacity: 0.75;
}

li[data-selected="true"] {
  border: 2px solid var(--app-accent);
}

li[data-selected="true"]:before {
  background-color: var(--app-accent);
  opacity: 0.2;
}

li div.row {
  z-index: 10;
  display: flex;
  position: relative;
  flex-flow: row;
  gap: 8px;
  align-items: center;
}

p.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 35px;
  height: 35px;
  border-radius: 3px;
}

p.icon span {
  font-size: 20px;
  font-weight: 600;
}



li div h6 {
  line-height: 20px;
  font-size: 14px;
  font-weight: 500;
}

li div p {
  font-size: 12px;
}

div.empty {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #8C8C8C;
}
</style>
