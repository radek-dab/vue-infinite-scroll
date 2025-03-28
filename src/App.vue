<script setup lang="ts">
import { fetchCharacters } from './api';
import CharacterList from './components/CharacterList.vue';
</script>

<template>
  <main>
    <CharacterList :characters="fetchCharacters()" />
  </main>
</template>

<style scoped>
main {
  padding: 1rem;
}
</style>
