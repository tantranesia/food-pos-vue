<template>
  <div>
    <v-layout fill-width>
      <v-row class="max-width-full">
        <v-col :style="{ background: $vuetify.theme.themes.light.black }" sm="7" class="pa-10">
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
        <v-col :style="{ background: $vuetify.theme.themes.light.base }" sm="5">
          <v-col class="pt-10">
            <p class="display-1 white--text">Orders #34562</p>
            <v-row class="button-group">
                <v-btn color="primary">Dine-In</v-btn>
                <v-btn color="primary">Take Away</v-btn>
                <v-btn color="primary">Delivery</v-btn>
                <v-btn color="primary">Reservation</v-btn>
            </v-row>
            <v-row class="my-6">
            <v-col sm="5">
              <p class="white--text ml-7 mr-16">Item</p>
            </v-col>
            <v-col sm="3">
              <p class="white--text ml-16 mr-10">Qty</p>
            </v-col>
            <v-col sm="3">
              <p class="white--text">Price</p>
            </v-col>
            </v-row>
            <v-flex>
              <v-row v-for="item in items" :key="item.menu_id" no-gutters>
              <v-col sm="2" class="mx-1">
                <v-img :src="item.image" class="rounded-circle" max-width="90%" max-height="75px" />
              </v-col>
                <v-col sm="4" class="mx-auto">
                  <p class="white--text">{{ item.name }}</p>
                  <p class="white--text">Rp{{ item.price }}</p>
                </v-col>
                <v-col sm="1">
                  <div color="base" class="card-cart">
                    <p class="white--text text-center">1</p>
                  </div>
                </v-col>
                <v-col sm="2">
                  <p class="white--text mx-4">Rp20000</p>
                </v-col>
                <v-col sm="2" class="mx-auto">
                  <v-img :src="trash" max-width="50%" max-height="20px" />
                </v-col>
              </v-row>
              <v-row class="justify-space-between mx-4">
                <p>Discount</p>
                <p>0</p>
              </v-row>
              <v-row class="justify-space-between mx-4">
                <p>Sub Total</p>
                <p>0</p>
              </v-row>
              <v-btn color="primary" class="my-10 button-order">
                Confirm Order
              </v-btn>
            </v-flex>
          </v-col>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
<script>
import axios from 'axios'
import image from '@/assets/image/nasi-goreng-jawa.jpeg'
import trash from '@/assets/image/Button.svg'

export default {
  data() {
    return {
      items: [],
      image,
      trash,
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
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}
.card-image {
  width: 15%;
  height: 60px;
}
.image-cart {
  width: 15%;
  height: 60px;
  min-width: 0%;
}
.button-order {
  min-width: 100%;
}
.card-cart {
  border: 1px solid #393c49;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  align-items: center;
  justify-items: center;
  mx: 5px;
}
</style>
