<template>
  <img alt="Vue logo" src="../assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js App"/>

  <ul v-if="users.length > 0">
    <li v-for="u in users" :key="u.id">
      {{ u.email }}
    </li>
  </ul>
  <p v-else>No user</p>
</template>

<script lang="ts">
import axios from 'axios';
import { computed, defineComponent } from 'vue';
import isSSR from '@/_base/isSSR';
import useStore from '../store/useVuexStore';
import HelloWorld from '../components/HelloWorld.vue';

export default defineComponent({
  name: 'Home',
  components: {
    HelloWorld,
  },
  setup() {
    const store = useStore();

    const users = computed(() => store.state.users);

    const fetch = async () => {
      console.log('fetching ...');

      const { data: res } = await axios.get('https://reqres.in/api/users?page=2');

      store.commit('setUsers', res.data);

      console.log(res.data);
      console.log('^^ fetch data ^^^');
    };

    if (!isSSR && !users.value.length) {
      fetch();
    }

    return {
      users,
      fetch,
    };
  },
  async serverPrefetch() {
    await this.fetch();
  },
});
</script>
