<script setup lang="ts">
import { Character } from '@/api';

export interface Props {
  character: Character;
}

defineProps<Props>();
</script>

<template>
  <article data-testid="character-card">
    <h2>{{ character.name }}</h2>
    <img :src="character.image" />
    <dl>
      <dt>Status</dt>
      <dd>{{ character.status }}</dd>
      <dt>Last known location</dt>
      <dd>{{ character.location.name }}</dd>
    </dl>
  </article>
</template>

<style scoped>
article {
  --image-size: 200px;
  --spacing: 0.6rem;

  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-columns: var(--image-size) 1fr;
  grid-template-areas:
    'image name'
    'image details';
  background: var(--color-background-soft);
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem 0 rgba(0, 0, 0, 0.2);
}

h2 {
  grid-area: name;
  margin: var(--spacing);
  line-height: 1;
}

img {
  grid-area: image;
  width: var(--image-size);
  height: var(--image-size);
  background-color: currentColor;
}

dl {
  grid-area: details;
  margin: var(--spacing);
  margin-top: 0;
  line-height: 1.5;
}

dt {
  font-weight: bold;
}
</style>
