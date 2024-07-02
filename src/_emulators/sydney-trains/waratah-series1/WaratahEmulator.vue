<script setup lang="ts">
import { computed, ref, stop, watch } from 'vue';
import WaratahScreen from './WaratahScreen.vue'
import { useVehicle } from '@/stores/vehicle';

const screenWidth = 94;
const screenHeight = 17;

const linePos = [0, 9];

let activePaint = new Array(94 * 17).fill(false);
let buffer = ref(new Array(94 * 17).fill(false));

const fontLibrary = await import('./WaratahFont') as any;
const iconLibrary = await import('./WaratahIcons') as any;

const vehicle = useVehicle();



const font = new Map<string, number[][]>(fontLibrary.font);
const icons = new Map<string, number[][]>(iconLibrary.icons);


let scrollPos = linePos.map(() => screenWidth);
let lineWidths = linePos.map(() => 0);

let doWipeDownAnimation = -1;


interface RenderElement {
  type: "text" | "icon";
  flags: { line: number; align: "center" | "left" | "right" | "scroll" };
  content: any;
}

const stage = ref<"moving" | "arriving" | "stopped">("stopped");

const nextStopsDelayed = ref(vehicle.vehicleNextStops);


watch([
  () => vehicle.vehicleMotionState,
  () => vehicle.vehicleDoorState
], () => {
  if (vehicle.vehicleMotionState === "moving") {
    stage.value = "moving";
  } else if (vehicle.vehicleMotionState === "arriving") {
    stage.value = "arriving";
  } else if (vehicle.vehicleMotionState === "stopped" && vehicle.vehicleDoorState == 'opening') {
    stage.value = "stopped";
  }
});


watch(
  () => stage.value, () => {
    doWipeDownAnimation = -1;
    nextStopsDelayed.value = JSON.parse(JSON.stringify(vehicle.vehicleNextStops));
  });
watch(
  () => vehicle.vehicleRoute, () => {
    doWipeDownAnimation = -1;
    nextStopsDelayed.value = JSON.parse(JSON.stringify(vehicle.vehicleNextStops));
  });

const renderElements = computed<RenderElement[]>(() => {
  const components = {
    topStationDisplay: {
      type: "text",
      flags: { line: 0, align: "center" },
      content: [nextStopsDelayed.value[0]],
    } as RenderElement,
    stoppingPattern: {
      type: "text",
      flags: { line: 1, align: "scroll" },
      content: [
        `Stopping at ${nextStopsDelayed.value.join(", ")}.`
      ],
    } as RenderElement,
  }

  console.log(components)

  if (stage.value === "moving") {
    return [
      components.topStationDisplay, components.stoppingPattern
    ];
  } else if (stage.value === "arriving") {
    return [
      components.topStationDisplay,
      {
        type: "text",
        flags: { line: 1, align: "center" },
        content: ["Next stop"],
      },
    ];
  } else if (stage.value === "stopped") {
    return Math.random() > 0.8 ? [
      components.topStationDisplay,
      {
        type: "text",
        flags: { line: 1, align: "scroll" },
        content: ["Please mind the gap between the train and the platform.", ""],
      }
    ] : [components.topStationDisplay];
  } else return [];
});


function UpdateScreen() {

  for (const element of renderElements.value) {
    if (element.type === "text") renderElementTextualContent(element);
    if (element.type === "icon") renderElementIcon(element);
  }

  FlushScreen()



  window.requestAnimationFrame(() => {
    UpdateScreen();
  });
}


function FlushScreen() {
  if (doWipeDownAnimation == -2) {
    buffer.value = activePaint;
    activePaint = new Array(94 * 17).fill(false);
  } else if (doWipeDownAnimation == -1) {
    activePaint = new Array(94 * 17).fill(false);
    buffer.value = activePaint;
  } else {
    buffer.value = new Array(94 * 17).fill(false).map((_, i) => {
      return i < doWipeDownAnimation * 94 ? activePaint[i] : false;
    });
  }
}



function runScrollUpdate() {
  if (doWipeDownAnimation == -2) {
    scrollPos = scrollPos.map((sp, i) => {
      if (sp < 0 - lineWidths[i]) {
        return screenWidth;
      } else {
        return sp - 1;
      }
    });
  } else if (doWipeDownAnimation > 20) {
    doWipeDownAnimation = -2;
  } else if (doWipeDownAnimation > 17) {
    doWipeDownAnimation += 0.1;
  } else if (doWipeDownAnimation > 0) {
    doWipeDownAnimation += 3;
  } else if (doWipeDownAnimation >= -1) {
    doWipeDownAnimation += 0.1;
    scrollPos = linePos.map(() => screenWidth);
  }
}


function setPixel(x: number, y: number, state: boolean) {
  if (x < 0 || x >= screenWidth || y < 0 || y >= screenHeight) return;
  activePaint[y * screenWidth + x] = state;
};

function placeCharacter(x: number, y: number, char: string) {
  const pixeldata = (
    font.has(char) ? font.get(char) : font.get("notfound")
  ) as number[][];

  if (x < -pixeldata[0].length || x >= screenWidth) return;

  for (let i = 0; i < pixeldata.length; i++) {
    for (let j = 0; j < pixeldata[i].length; j++) {
      if (pixeldata[i][j] === 1) {
        setPixel(x + j, y + i, true);
      }
    }
  }
};

function getCharacterSize(char: string) {
  const pixeldata = (
    font.has(char) ? font.get(char) : font.get("notfound")
  ) as number[][];
  return [pixeldata[0].length, pixeldata.length];
}

function renderElementTextualContent(el: RenderElement) {
  const { line, align } = el.flags;
  const content = (el.content as string[])
    .map((s) => s.split("").join("|"))
    .join("".padEnd(screenWidth / 2 + 5, " "))
    .split("");
  const charWidth = content.map((char) =>
    char == "|" ? 1 : getCharacterSize(char)[0]
  );
  const width = charWidth.reduce((a, b) => a + b, 0);

  if (width !== lineWidths[line]) {
    lineWidths[line] = width;
    scrollPos[line] = screenWidth;
  }

  let x = 0;
  if (align === "scroll") {
    x = scrollPos[line];
  } else if (align === "left") {
    x = 0;
  } else if (align === "center") {
    x = Math.floor((screenWidth - width) / 2);
  } else if (align === "right") {
    x = screenWidth - content.length * 5;
  }

  for (let i = 0; i < content.length; i++) {
    if (content[i] !== "|") {
      placeCharacter(x, linePos[line], content[i]);
      x += getCharacterSize(content[i])[0];
    } else {
      x += 1;
    }
  }
}
function renderElementIcon(el: RenderElement) {
  const x = 0,
    y = 0;

  const pixeldata = (
    icons.has(el.content)
      ? icons.get(el.content)
      : icons.get("notfound")
  ) as number[][];

  if (x < -pixeldata[0].length || x >= screenWidth) return;

  for (let i = 0; i < pixeldata.length; i++) {
    for (let j = 0; j < pixeldata[i].length; j++) {
      if (pixeldata[i][j] === 1) {
        setPixel(x + j, y + i, true);
      }
    }
  }
}
















await new Promise((resolve) => {
  setTimeout(resolve, 1000)
})


window.requestAnimationFrame(() => {
  UpdateScreen();
});

setInterval(() => {
  runScrollUpdate();
}, 32)

</script>

<template>
  <WaratahScreen :imageData="buffer" />
</template>
