<script setup lang="ts">
import router from '@/router';

setTimeout(() => {
  router.push("/sydneytrains:waratah1");
}, 500);

</script>

<template>
  <figure>
    <h3>Welcome!</h3>
    <p>Select an emulator to begin.</p>
  </figure>
</template>

<style scoped>
figure {
  display: flex;
  flex-flow: column;
  gap: 10px;
  align-items: center;
  justify-content: center;
  height: 100%;
}

h3 {
  font-size: 1.5rem;
  font-weight: 500;
}
</style>