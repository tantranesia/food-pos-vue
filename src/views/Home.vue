<template>
  <div>
    <v-layout fill-width>
      <v-row class="max-width-full">
        <v-col
          :style="{ background: $vuetify.theme.themes.light.black }"
          md="7"
          class="pa-10"
        >
          <v-row>
            <p class="display-1 white--text text--darken-2">
              {{ name }}
            </p>
            <v-text-field placeholder="Search"></v-text-field>
          </v-row>
          <p class="white--text text--darken-2">
            {{ address }}
          </p>
          <p class="white--text text--darken-2">
            {{ dateNow }}
          </p>
          <v-row mx="4">
            <v-col
              v-for="item in items"
              :key="item.menu_id"
              md="4"
              sm="1"
            >
              <v-card
                class="px-5 pb-5 pt-2"
                color="base"
              >
                <v-img
                  :src="item.image"
                  class="mx-auto rounded-lg my-2"
                  width="200px"
                  height="200px"
                />
                <p class="white--text text--darken-2 font-weight-bold">
                  {{ item.name }}
                </p>
                <p class="white--text text--darken-2">
                  Rp{{ item.price }}
                </p>
                <p class="white--text text--darken-2">
                  {{ item.description }}
                </p>
                <v-btn
                  color="primary"
                  block
                  @click="onAdd()"
                >
                  Add
                </v-btn>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          :style="{ background: $vuetify.theme.themes.light.base }"
          md="5"
        >
          <Cart />
          <v-dialog transition="dialog-bottom-transition">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                block
                color="primary"
                v-bind="attrs"
                v-on="on"
              >
                <v-row>
                  <v-col>
                    <p class="base--text">
                      1 Item
                    </p>
                  </v-col>
                  <v-col class="base--text">
                    <p>Rp35000</p>
                  </v-col>
                </v-row>
              </v-btn>
            </template>
            <template>
              <v-card color="base">
                <v-col class="pt-10">
                  <p class="display-1 white--text">
                    Orders #34562
                  </p>
                  <v-row class="button-group">
                    <v-chip color="primary">
                      Dine-In
                    </v-chip>
                    <v-chip color="primary">
                      Take Away
                    </v-chip>
                    <v-chip color="primary">
                      Delivery
                    </v-chip>
                    <v-chip color="primary">
                      Reservation
                    </v-chip>
                  </v-row>
                  <v-flex class="my-10">
                    <v-row
                      v-for="item in items"
                      :key="item.menu_id"
                      dense
                    >
                      <v-col
                        md="6"
                        sm="2"
                        class="mx-auto"
                      >
                        <p class="white--text">
                          {{ item.name }}
                        </p>
                        <p class="white--text">
                          Rp{{ item.price }}
                        </p>
                      </v-col>
                      <v-col
                        md="6"
                        sm="3"
                      >
                        <v-img
                          :src="item.image"
                          class="rounded-lg mx-auto my-2"
                          max-width="150px"
                          max-height="100px"
                        />
                        <v-row
                          class="my-3 justify-sapce-between button-cart"
                          md="6"
                          sm="3"
                        >
                          <v-col
                            md="2"
                            sm="1"
                          >
                            <v-icon color="primary">
                              {{ mdiPlus }}
                            </v-icon>
                          </v-col>
                          <v-col
                            md="2"
                            sm="1"
                          >
                            <div color="base">
                              <p class="white--text text-center card-cart">
                                1
                              </p>
                            </div>
                          </v-col>
                          <v-col
                            md="2"
                            sm="1"
                          >
                            <v-icon color="primary">
                              {{ mdiMinus }}
                            </v-icon>
                          </v-col>
                        </v-row>
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
                    <v-btn
                      color="primary"
                      class="my-10 button-order"
                      block
                    >
                      Confirm Order
                    </v-btn>
                  </v-flex>
                </v-col>
              </v-card>
            </template>
          </v-dialog>
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
<script>
import axios from 'axios'
import { mdiPlus, mdiMinus } from '@mdi/js'
import image from '@/assets/image/nasi-goreng-jawa.jpeg'
import trash from '@/assets/image/Button.png'
import minus from '@/assets/image/minus-small.svg'
import Cart from './Cart.vue'

export default {
  components: {
    Cart,
  },
  data() {
    return {
      items: [],
      cartItems: [],
      image,
      trash,
      minus,
      mdiPlus,
      mdiMinus,
      dateNow: '',
      address: '',
      name: '',
    }
  },

  mounted() {
    this.getData()
    this.getDate()
    this.onAdd()
  },

  methods: {
    async getData() {
      axios
        .get('https://wa-link.deploy.cbs.co.id/shop_data/SN4TCROYT-OE4QB')
        .then(res => {
          this.items = res.data.data.shop_data.menu
          this.address = res.data.data.shop_data.alamat
          this.name = res.data.data.shop_data.name
        })
    },
    getDate() {
      const timelaps = new Date()
      this.dateNow = timelaps.toDateString()
    },
    onAdd(product) {
      const exist = this.cartItems.find(x => x.menu_id === product.menu_id)
      if (exist) {
        this.cartItems = this.cartItems.map(x => (x.menu_id === product.menu_id
          ? { ...exist, category: exist.category + 1 }
          : x))
      } else {
        this.cartItems = [...this.cartItems, { ...product, category: 1 }]
      }
      console.log(exist, 'cek')
    },
    isMini() {
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          return true
        case 'sm':
          return true
        case 'md':
          return false
        case 'lg':
          return false
        case 'xl':
          return false
        default:
          return false
      }
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
  justify-content: space-around;
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
.button-cart {
  align-items: center;
  justify-content: center;
}
.card-cart {
  border: 1px solid #393c49;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
}
.trash-image {
  align-items: center;
  justify-content: center;
}
.text-card {
  white-space: nowrap;
  word-break: normal;
  overflow: hidden;
  text-overflow: ellipsis;
}
.minus-icon {
  color: #ea7c69;
}
</style>
