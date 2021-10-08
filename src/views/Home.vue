<template>
  <div>
      <v-row>
        <v-col :style="{background: $vuetify.theme.themes.light.black}" sm="7" class="pa-10">
          <v-row>
            <p class="display-1 white--text text--darken-2">Nasi Campur Mang ADE</p>
            <v-text-field placeholder="Search"></v-text-field>
          </v-row>
          <p class="white--text text--darken-2">di rumah aja</p>
          <p class="white--text text--darken-2">Wed Oct 06 2021</p>
          <v-row mx="4">
            <v-col sm="4" v-for="item in items" :key="item.menu_id">
              <v-card class="card-home px-5 pb-5" color="base">
                <v-img
                  :src="item.image"
                  class="mx-auto rounded-circle"
                  width="55%"
                  height="100px"
                  :z-index="zIndex"
                />
                <p class="white--text text--darken-2 text-center">{{ item.name }}</p>
                <p class="white--text text--darken-2 text-center">Rp{{ item.price }}</p>
                <p class="white--text text--darken-2 text-center">{{ item.description }}</p>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-app :style="{background: $vuetify.theme.themes.light.base}" sm="5">
          <v-col class="pt-10 mx-2">
            <p class="display-1 white--text">Orders #34562</p>
            <v-row align="center" justify="space-around" class="button-group">
               <v-btn color="primary">Dine-In</v-btn>
               <v-space></v-space>
              <v-btn color="primary">Take Away</v-btn>
               <v-space></v-space>
              <v-btn color="primary">Delivery</v-btn>
               <v-space></v-space>
               <v-btn color="primary">Reservation</v-btn>
            </v-row>
            <v-row class="my-6">
            <p class="white--text">Item</p>
            <v-spacer></v-spacer>
            <p class="white--text mx-10">Qty</p>
            <p class="white--text">Price</p>
            </v-row>
            <v-flex>
            <v-row>
            <v-image src="@/assets/image/nasi-goreng-jawa.jpeg"/>
            <p class="white--text">Nasi Goreng Jawa</p>
            </v-row>
            </v-flex>
          </v-col>
        </v-app>
      </v-row>
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
.button-group {
flex-wrap: wrap
}
</style>
