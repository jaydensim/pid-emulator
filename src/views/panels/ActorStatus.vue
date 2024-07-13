<script setup lang="ts">
import { computed } from 'vue';
import PanelModule from '../../components/PanelModule.vue';

import { useActor } from '../../stores/actor';
const actor = useActor();

const actorStatusMappings = {
  "stopped": "⏹️",
  "paused": "⏸️",
  "running": "▶️"
}

function setActorState(state: "stopped" | "paused" | "running") {
  actor.setActorState(state);
}

function skip() {
  actor.skipDelay();
}

function skipStation() {
  actor.skipToNextStation();
}

const actorProgress = computed(() => {
  return `${Math.min(Math.max(actor.actorProgramProgress * 100, 0), 100)}%`
});

const actorWaitStateProgress = computed(() => {
  return `${Math.min(Math.max(actor.actorWaitStateProgress * 100, 0), 100)}%`
});

function togglePlayState() {
  if (actor.actorState == "running") {
    setActorState("paused");
  } else {
    setActorState("running");
  }
}

</script>


<template>
  <PanelModule title="Actor Status">
    <li class="instruction" :data-state="actor.actorState" @click="togglePlayState()">
      <div class="row">
        <p class="icon">{{ actor.isSkippingToNextStation ? "⏭️" : actorStatusMappings[actor.actorState] }}</p>
        <div class="">
          <h6>{{ actor.actorState.split("").map((c, i) => i == 0 ? c.toLocaleUpperCase() : c).join("") }}</h6>
          <p hide-hover>
            <span v-if="actor.actorState == 'stopped'">Ready to start.</span>
            <span v-else>{{ actor.currentActorInstruction }}</span>
          </p>
          <p show-hover>
            <span v-if="actor.actorState == 'stopped' || actor.actorState == 'paused'">Press to play.</span>
            <span v-else>Press to pause.</span>
          </p>
        </div>
      </div>
    </li>
    <section class="vstack">
      <div class="hstack">
        <button @click="setActorState('running')" :disabled="actor.actorState == 'running'">Play</button>
        <button @click="skip()" :disabled="actor.actorState !== 'running' || actor.isSkippingToNextStation">
          Skip</button>
        <button @click="setActorState('paused')"
          :disabled="actor.actorState !== 'running' || actor.isSkippingToNextStation">Pause</button>
        <button @click="setActorState('stopped')"
          :disabled="actor.actorState == 'stopped' || actor.isSkippingToNextStation">Stop</button>
      </div>
      <div class="hstack">
        <button @click="skipStation()" :disabled="actor.actorState !== 'running'">
          Skip to next station</button>
      </div>
    </section>
  </PanelModule>
</template>

<style scoped>
.hstack {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.vstack {
  display: flex;
  flex-flow: column;
  gap: 8px;
}

.hstack button {
  width: 100%;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 6px;
  padding: 3px 6px;
  background-color: white;
  border: 2px solid transparent;
  cursor: pointer;
}

.hstack button:disabled {
  opacity: 0.5;
  pointer-events: none;
}

.hstack button:hover {
  border: 2px solid var(--app-accent);
}


li.instruction {
  list-style: none;
  background-color: #ffffff;
  padding: 6px 8px 8px;
  border-radius: 6px;
  border: 2px solid transparent;
  position: relative;
  cursor: pointer;
}

li.instruction:before {
  content: "";
  background-color: #ffffff;
  width: v-bind(actorProgress);
  height: 100%;
  display: block;
  position: absolute;
  left: 0px;
  top: 0px;
  z-index: 0;
  border-radius: 4px 0px 0px 4px;
}

li:hover {
  opacity: 0.75;
  border: 2px dotted var(--app-accent);
}

li.instruction:after {
  content: "";
  background-color: var(--app-accent);
  width: calc(v-bind(actorWaitStateProgress) - 16px);
  height: 2px;
  display: block;
  position: absolute;
  bottom: 2px;
  z-index: 1;
  border-radius: 6px;
}


li[data-state="running"],
li[data-state="paused"] {
  border: 2px solid var(--app-accent);
}

li[data-state="running"]:before,
li[data-state="paused"]:before {
  background-color: var(--app-accent);
  opacity: 0.2;
}

li[data-state="paused"]:before {
  animation: pulse 3s linear infinite;
}

@keyframes pulse {

  0%,
  100% {
    opacity: 0.2;
  }

  50% {
    opacity: 0;
  }
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

li.instruction:hover p[hide-hover] {
  display: none;
}

li.instruction p[show-hover] {
  display: none;
}

li.instruction:hover p[show-hover] {
  display: block;
}
</style>