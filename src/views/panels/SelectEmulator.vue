<script setup lang="ts">
import { RouterLink } from 'vue-router'
import PanelModule from '../../components/PanelModule.vue';

import { useLoaders } from '@/stores/loaders';
const loaders = useLoaders();

const emuTypeMapping = {
  led: '💡',
  display: "🖥️",
  "other": '🚦'
}


</script>


<template>
  <PanelModule title="Select Emulator" height="300">
    <ul v-if="loaders.emulators.size !== 0">
      <RouterLink :to="`/${emulator[0]}`" v-for="emulator of loaders.emulators" :key="emulator[0]" activeClass="active"
        :data-disabled="emulator[1].disabled">
        <li>
          <div class="row">
            <p class="icon">{{ emuTypeMapping[emulator[1].type] }}</p>
            <div class="hstack">
              <h6>{{ emulator[1].name }}</h6>
              <p>{{ emulator[1].description }}</p>
            </div>
          </div>
        </li>
      </RouterLink>
    </ul>
    <div class="empty" v-else>
      Waiting for emulators to load...
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

.active li {
  border: 2px solid var(--app-accent);
}

.active li:before {
  background-color: var(--app-accent);
  opacity: 0.2;
}

[data-disabled="true"] {
  opacity: 0.5;
  pointer-events: none;
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
  font-size: 25px;
  text-align: center;
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
