<script setup lang="ts">
import { ref, watch, useTemplateRef, nextTick } from 'vue';
import type { Page, Character } from '@/api';
import useVisibility from '@/composables/useVisibility';
import CharacterCard from './CharacterCard.vue';
import SpinLoader from './SpinLoader.vue';

export interface Props {
  characters: AsyncIterable<Page<Character>>;
}

const props = defineProps<Props>();

const list = ref<Character[]>([]);
const loading = ref(false);
const done = ref(false);
const iterator = props.characters[Symbol.asyncIterator]();
const spinnerRef = useTemplateRef('spinner');
const { visible } = useVisibility(spinnerRef, { margin: '100%' });

async function loadMore() {
  try {
    loading.value = true;
    while (visible.value) {
      const result = await iterator.next();
      if (result.done) {
        done.value = true;
        break;
      } else {
        list.value = [...list.value, ...result.value.results];
      }
      await nextTick();
    }
  } finally {
    loading.value = false;
  }
}

watch(visible, () => {
  if (visible && !loading.value) {
    loadMore();
  }
});
</script>

<template>
  <section data-testid="character-list">
    <CharacterCard
      v-for="character in list"
      :key="character.id"
      :character="character"
    />
  </section>
  <SpinLoader v-if="!done" ref="spinner" />
</template>

<style scoped>
section {
  display: grid;
  gap: 1rem;
}

@media (min-width: 600px) {
  section {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 960px) {
  section {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1920px) {
  section {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (min-width: 2560px) {
  section {
    grid-template-columns: repeat(4, 1fr);
  }
}

.spin-loader {
  margin: 1rem auto 0;
}
</style>
