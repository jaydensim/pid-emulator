<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const screenWidth = 94;
const screenHeight = 17

const props = defineProps<{
  imageData: Array<Boolean>
}>();

const pixels = new Array(94 * 17);

const injectLedsRef = ref<SVGGElement | null>(null);
const injectDefsRef = ref<SVGDefsElement | null>(null);

function createLED(index: number, x_col: number, y_row: number) {
  const x = 126 + (x_col - 1) * 8;
  const y = 35 + (y_row - 1) * 8;

  const id = `${x}-${y}`;

  const mod = `class="led"`;
  const glow = `class="glow"`;

  const lgd1 = `gradientUnits="userSpaceOnUse">
    <stop stop-color="#E86F00" />
    <stop offset="1" stop-color="#F9FF00" stop-opacity="0" />
  </linearGradient>`;

  const lgd2 = `gradientUnits="userSpaceOnUse">
    <stop stop-color="#F9FF00" stop-opacity="0" />
    <stop offset="1" stop-color="#E86F00" />
  </linearGradient>`;

  return [
    `
    <rect x="${x}" y="${y}" ${mod} fill="#36363645" />
    <g id="led-${index}">
      <rect x="${x - 11}" y="${y - 8}" ${glow} fill="url(#${id}-radial)" />
      <rect x="${x}" y="${y}" ${mod} fill="url(#${id}-linear-1)" />
      <rect x="${x}" y="${y}" ${mod} fill="url(#${id}-linear-2)" />
      <rect x="${x}" y="${y}" ${mod} fill="url(#${id}-linear-3)" />
      <rect x="${x}" y="${y}" ${mod} fill="url(#${id}-linear-4)" />
    </g>`,
    `
    <radialGradient id="${id}-radial" cx="0" cy="0" r="1"
      gradientUnits="userSpaceOnUse"
      gradientTransform="translate(${x + 2} ${y + 1}) rotate(90) scale(9 13)">
      <stop stop-color="#F9FF00" />
      <stop offset="1" stop-color="#E86F00" stop-opacity="0" />
    </radialGradient>
    <linearGradient
      id="${id}-linear-1"
      x1="${x + 2}" y1="${y}"
      x2="${x + 2}" y2="${y + 2}" ${lgd1}
    <linearGradient
      id="${id}-linear-2"
      x1="${x + 2}" y1="${y}"
      x2="${x + 2}" y2="${y + 2}" ${lgd2}
    <linearGradient
      id="${id}-linear-3"
      x1="${x + 4}" y1="${y + 1}"
      x2="${x}" y2="${y + 1}" ${lgd1}
    <linearGradient
      id="${id}-linear-4"
      x1="${x + 4}" y1="${y + 1}"
      x2="${x}" y2="${y + 1}" ${lgd2}`,
  ];
};

function runUpdate() {
  props.imageData.forEach((state, i) => {
    pixels[i].style.display = state ? "block" : "none";
  });
}

onMounted(() => {
  const gs: string[] = [];
  const defs: string[] = [];

  for (let x = 1; x <= screenWidth; x++) {
    for (let y = 1; y <= screenHeight; y++) {
      const [g, d] = createLED(x - 1 + (y - 1) * screenWidth, x, y);
      gs.push(g);
      defs.push(d);
    }
  }

  injectLedsRef.value!.innerHTML = gs.join('');
  injectDefsRef.value!.innerHTML = defs.join('');


  for (let i = 0; i < 94 * 17; i++) {
    pixels[i] = injectLedsRef.value!.querySelector(
      `#led-${i}`
    ) as SVGGElement;
  }


  watch(() => props.imageData, () => {
    runUpdate();
  });

  runUpdate();

});
</script>

<template>
  <svg width="1000" height="200" viewBox="0 0 1000 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="Waratah1">
    <rect width="1000" height="200" fill="#282828" />
    <rect x="114" y="22" width="772" height="156" rx="4" fill="#202020" />
    <g style="filter: brightness(1.5) saturate(2.5);" id="LedPanel">
      <rect width="752" height="136" transform="translate(124 32)" fill="#101010" />
      <g ref="injectLedsRef">
      </g>
    </g>
    <defs ref="injectDefsRef"></defs>
  </svg>
</template>

<style scoped>
svg {
  width: 100%;
  height: 100%;
}
</style>

<style>
svg.Waratah1 .led {
  width: 4px;
  height: 2px;
  rx: 0.2px;
}

svg.Waratah1 .glow {
  opacity: 0.25;
  width: 26px;
  height: 18px;
  rx: 0.2px;
}
</style>