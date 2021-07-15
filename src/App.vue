<template>
  <ul>
    <li>
      <router-link :to="{ name: 'home' }">Go to home</router-link>
    </li>

    <li>
      <router-link :to="{ name: 'page', params: { id: 2 } }">Go to other page</router-link>
    </li>
  </ul>

  <component :is="$route.meta.layout || defaultLayout">
    <router-view />
  </component>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import DefaultLayout from '@/layouts/default.vue';

export default defineComponent({
  components: {
    DefaultLayout,
  },
  setup() {
    const defaultLayout = DefaultLayout;
    return {
      defaultLayout,
    };
  },
});
</script>
