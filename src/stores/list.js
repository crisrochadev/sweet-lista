import { defineStore } from 'pinia';
import { db } from 'boot/localbase';
import { Notify } from 'quasar'


export const useList = defineStore('sweetlist', {
  state(){
    return{
      list:[],
      loading:false,
      item:{
        id:null,
        title:null,
        quantity:1,
        price:'0,0',
        added:false
      },
      showDialog:false,
      isUpdate:false
    }
  },
  actions: {
    setId(){
      return this.list.length + 1
    },
    async insert (data) {
      if(data.title) this.item['title'] = data.title;
      if(data.quantity) this.item['quantity'] = data.quantity;
      if(data.price) this.item['price'] = parseFloat(data.price.replace(',','.'));
      this.item.id = this.setId();
      this.item.added = false;

      console.log(this.item)
      this.loading = true;
      const res = await db.collection('sweetlist').add(JSON.parse(JSON.stringify(this.item)));
      await this.getAll();
      this.loading = false;
      return res;
    },
    async update(id,data){
      this.loading = true;
      if(data.price) data.price = parseFloat(data.price.replace(',','.'))
      const res = await db.collection('sweetlist').doc({ id }).update(data);
     await this.getAll();
      this.loading = false;
      return res;
    },

    async getAll(){
      this.loading = true;
      const res = await db.collection('sweetlist').orderBy('id', 'desc').get().then(res => res);
      this.list = res;
      this.loading = false;
      return res;
    },
    async getById(id){
      this.loading = true;
      const res = await db.collection('lisweetlistst').doc({ id }).get().get({ id }).then(res => res);
      this.item = res;
      this.loading = false;
      return res;
    },
    async delete(id){
      this.loading = true;
      const res = await db.collection('sweetlist').doc({ id}).delete()
      await this.getAll();
      this.showNotify('Item Deletado','negative','delete')
      this.loading = false;
      return res;
    },
    openEdit(item){
      this.item = item;
      this.isUpdate = true;
      this.showDialog = true;
    },
    showNotify(msg,color, icon){
      Notify.create({
        color,
        textColor:'white',
        icon: icon,
        message:msg,
        position:'left'
      })
    }
  }
})
