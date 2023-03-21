<template>
  <q-page class="h-full" style="overflow: hidden;">

<q-scroll-area style="max-width:700px;width:100%;height:calc(100vh - 100px);margin:0 auto;">
  <q-list separator style="padding-bottom:20px">
  <q-slide-item v-for="item in listItems" :key="item.id" @left="$event => onLeft($event,item)" @right="$event => onRight($event,item)" right-color="negative">
    <template v-slot:left>
          <q-icon name="done" />
        </template>
        <template v-slot:right>
          <q-icon name="delete" />
        </template>
    <q-item>
      <q-item-section avatar>
      <q-toggle v-model="item.added" size="xs" color="primary" @click="$event => list.update(item.id,{added:item.added})"/>
    </q-item-section>
      <q-item-section>
      <q-item-label class="uppercase font-bold text-primary" style="font-size:14px">{{ item.title }}</q-item-label>
      <q-item-label caption class="w-full flex justify-between">
        <q-badge>{{ item.quantity }}</q-badge>
        <q-badge>R$ {{ item.price  }}</q-badge>
        TOTAL: <q-badge color="accent">R$ {{ (item.quantity * item.price).toFixed(2).replace('.',',') }}</q-badge>
      </q-item-label>
    </q-item-section>
    <q-item-section avatar>
      <q-btn icon="draw" size="md" flat round  color="accent" @click="list.openEdit(item)"/>
    </q-item-section>
    </q-item>
  </q-slide-item>
</q-list>
</q-scroll-area>
  </q-page>
</template>

<script>
import { useList } from 'src/stores/list';
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',
  data(){
    const list = useList();
    return{
      list,
      timer:null
    }
  },
  computed:{
    listItems(){
      return this.list.list
    },
  },
  methods:{
    finalize (reset) {
      this.timer = setTimeout(() => {
        reset()
      }, 500)
    },
    async onLeft ({ reset }, item) {
      item.added = !item.added;
      await this.list.update(item.id,{added:item.added})
        this.finalize(reset)
      },

      async onRight ({ reset }, item) {
        await this.list.delete(item.id)
        this.finalize(reset)
      }
  }
})
</script>
