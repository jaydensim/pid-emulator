<script setup>
const yes = await new Promise((resolve) => {
  setTimeout(() => {
    resolve('yes')
  }, 3000000000000)
})
</script>

<template>
  {{ yes }}
</template>