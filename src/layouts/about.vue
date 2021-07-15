<template>
  <main class="page-main">
    <h1>About Layout</h1>
    <slot/>
  </main>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'about',
});
</script>
