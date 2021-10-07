<template>
  <div>
    <v-card class="mb-6">
      <v-card-title>Nasi Campur Mang ADE</v-card-title>
      <v-card-text>di rumah aja</v-card-text>
      <v-card-text>
        Wed Oct 06 2021
      </v-card-text>
    </v-card>

    <v-card v-for="item in items" :key="item.menu_id">
      <v-img :src="item.image" />
      <v-card-title>{{ item.name }}</v-card-title>
      <v-card-text>Rp{{ item.price }}</v-card-text>
      <v-card-text>{{ item.description }}</v-card-text>
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
