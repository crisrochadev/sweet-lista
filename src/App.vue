<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useList } from './stores/list';

export default defineComponent({
  name: 'App',
  data(){
    const store = useList();
    return{
      store
    }
  },
  async created(){
    await this.store.getAll();
  }
})
</script>
