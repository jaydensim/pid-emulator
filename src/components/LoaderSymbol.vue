<script setup lang="ts">
</script>

<template>
  <span></span>
</template>

<style scoped>
span::before {
  content: "🕛🕐🕑🕒🕓🕔🕕🕖🕗🕘🕙🕚";
  animation: change 1s linear infinite;
}

@keyframes change {
  0% {
    content: "🕛";
  }

  8.33% {
    content: "🕐";
  }

  16.66% {
    content: "🕑";
  }

  25% {
    content: "🕒";
  }

  33.33% {
    content: "🕓";
  }

  41.66% {
    content: "🕔";
  }

  50% {
    content: "🕕";
  }

  58.33% {
    content: "🕖";
  }

  66.66% {
    content: "🕗";
  }

  75% {
    content: "🕘";
  }

  83.33% {
    content: "🕙";
  }

  91.66% {
    content: "🕚";
  }

  100% {
    content: "🕛";
  }
}
</style>