<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> SWEET LIST </q-toolbar-title>
        <q-space />
        <div class="flex justify-between items-center" style="position:relative;height:40px">
          <p class="flex justify-between items-center q-px-sm q-mr-sm bg-white" style="height:100%;border-radius:4px">
            <span class="text-accent" style="font-weight:800;font-size:18px">{{ totalItems }}</span>
            <span
              class="text-xs uppercase caption text-grey-8"
              style="font-size: 12px; font-weight: 300; margin-left: 10px"
              >itens</span
            >
          </p>
          <p class="flex justify-between items-center q-px-sm  bg-white" style="height:100%;border-radius:4px">
            <span
              class="text-xs uppercase caption text-grey-8"
              style="font-size: 12px; font-weight: 300; margin-right: 10px"
              >Total:</span
            >
            <span class="text-accent" style="font-weight:800;font-size:18px">R$ {{ totalPrices.toFixed(2).replace('.',',') }}</span>
          </p>
        </div>
      </q-toolbar>
    </q-header>

    <q-dialog position="top" v-model="show">
      <q-card style="padding: 10px">
        <q-btn
          v-if="list.isUpdate"
          @click="
            () => {
              list.showDialog = !list.showDialog;
              list.isUpdate = !list.isUpdate;
            }
          "
          icon="close"
          style="position: absolute; top: 5px; right: 5px"
          flat
          round
          dense
          color="primary"
        />
        <p class="text-center uppercase text-primary text-bold">
          Adicionar novo Item
        </p>
        <q-input
          label="Novo Item"
          v-model="item.title"
          autofocus
          outlined
          dense
        />
        <div style="display: flex; width: 100%; margin-top: 10px">
          <q-input
            label="Qtd"
            v-model="item.quantity"
            type="number"
            autofocus
            outlined
            dense
            style="margin-right: 10px"
          />
          <q-input
            label="Preço"
            v-model="item.price"
            autofocus
            outlined
            dense
            prefix="R$"
            mask="#,##"
            fill-mask="0"
            reverse-fill-mask
          />
        </div>
        <q-btn
          label="salvar"
          @click="save"
          icon="save"
          class="full-width q-mt-md"
          color="accent"
          :loading="list.loading"
        />
      </q-card>
    </q-dialog>
    <div
      :style="`
     position:fixed;bottom:10px;z-index:999999;width:100vw;display:flex;justify-content:center;
    `"
    >
      <q-btn
        icon="add"
        color="accent"
        round
        size="lg"
        @click="
          () => {
            list.isUpdate = false;
            list.item = {
              title: null,
              quantity: 1,
              price: '0,0',
            };
            list.showDialog = !list.showDialog;
          }
        "
        :style="
          list.showDialog
            ? 'transform:rotate(45deg);transition:0.3s'
            : 'transform:rotate(0);transition:0.3s'
        "
      />
    </div>
    <q-footer>
      <div style="height: 40px"></div>
    </q-footer>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { useList } from "src/stores/list";
import { defineComponent } from "vue";

export default defineComponent({
  name: "MainLayout",

  data() {
    const list = useList();
    return {
      list,
    };
  },
  computed: {
    show: {
      get() {
        return this.list.showDialog;
      },
      set(newValue) {
        this.list.showDialog = newValue;
      },
    },
    totalPrices() {
      return this.list.list
        .filter((item) => item.added)
        .reduce((acc, item) => acc + item.price, 0);
    },
    totalItems() {
      console.log(this.list.list);
      return this.list.list
        .filter((item) => item.added)
        .reduce((acc, item) => acc + parseInt(item.quantity), 0);
    },
    item: {
      get() {
        return this.list.item;
      },
      set(newValue) {
        this.list.item = newValue;
      },
    },
  },
  methods: {
    save() {
      if (this.list.isUpdate) {
        this.list.update(this.item.id, this.item);
        this.show = false;
        this.list.isUpdate = false;
      } else {
        this.list.insert({
          title: this.item.title,
          quantity: this.item.quantity,
          price: this.item.price,
        });
        this.show = false;
      }
    },
  },
});
</script>
