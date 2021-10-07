<template>
  <div>
    <v-card class="pa-10" color="black">
    <v-row>
      <p class="display-1 white--text text--darken-2">Nasi Campur Mang ADE</p>
       <v-text-field
          placeholder="Search"
        ></v-text-field>

    </v-row>
      <p class="white--text text--darken-2">di rumah aja</p>
      <p class="white--text text--darken-2">Wed Oct 06 2021</p>
      <v-row mx="4">
        <v-col sm="4" v-for="item in items" :key="item.menu_id">
          <v-card class="card-home px-5 pb-5" color="base">
            <v-img :src="item.image" class="mx-auto rounded-circle" width="45%" height="140px" :z-index="zIndex" />
            <p  class="white--text text--darken-2">{{ item.name }}</p>
            <p  class="white--text text--darken-2">Rp{{ item.price }}</p>
            <p  class="white--text text--darken-2">{{ item.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      items: [],
    }
  },

  mounted() {
    this.getData()
  },

  methods: {
    async getData() {
      axios.get('https://wa-link.deploy.cbs.co.id/shop_data/SN4TCROYT-OE4QB').then(res => {
        this.items = res.data.data.shop_data.menu
        console.log(res, 'cel res')
      })
    },
  },
}
</script>
<style scoped>
.image-card {
  position: absolute;
  top: 20;
}
.card-home {
  position: relative;
}
</style>
