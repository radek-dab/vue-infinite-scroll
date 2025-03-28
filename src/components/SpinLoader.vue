<template>
  <div class="spin-loader" />
</template>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

div {
  --size: 3em;
  --border-width: 4px;

  width: var(--size);
  height: var(--size);
  border-radius: 50%;
  border: var(--border-width) solid transparent;
  border-top: var(--border-width) solid currentColor;
  animation: spin 1s linear infinite;
}
</style>
