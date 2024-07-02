<script setup lang="ts">
import { computed } from 'vue';


const props = defineProps<{
  title: string
  height?: string | number
}>();

const heightCSS = computed(() => {
  return props.height ? `${props.height}px` : 'auto';
});

</script>

<template>
  <section>
    <p>{{ props.title }}</p>
    <slot />
  </section>
</template>

<style scoped>
section {
  background-color: #f6f6f7;
  border-radius: 8px;
  padding: 13px 16px 16px;
  width: 350px;
  display: flex;
  flex-flow: column;
  gap: 8px;

  height: v-bind(heightCSS);
}

p {
  font-weight: 600;
}
</style>