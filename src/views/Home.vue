/* eslint-disable no-tabs */
<template>
  <div>
    <v-layout fill-width>
      <HomeMobile
        v-if="screenSize"
        :items-mobile="itemsMobile"
        :address="address"
        :date-now="dateNow"
        :name="name"
        :items="items"
      />
      <v-row
        v-else
        class="max-width-full"
      >
        <v-col
          :style="{ background: $vuetify.theme.themes.light.black }"
          md="7"
          sm="4"
          class="py-10 px-5"
        >
          <!-- <v-icon>
            mdi open-in-full
          </v-icon> -->
          <v-btn @click="toggleFull()">
            Full
          </v-btn>

          <v-row>
            <p class="display-1 white--text text--darken-2 mx-5">
              {{ name }}
            </p>
            <v-text-field
              v-model="search"
              placeholder="Search"
            ></v-text-field>
          </v-row>
          <p class="white--text text--darken-2 mx-5">
            {{ address }}
          </p>
          <p class="white--text text--darken-2 mx-5">
            {{ dateNow }}
          </p>
          <v-row mx="4">
            <v-row mx="4">
              <v-col
                v-for="item in getSearch"
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
                    max-width="200px"
                    min-height="100px"
                    max-height="150px"
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
                    @click="onAdd(item)"
                  >
                    Add
                  </v-btn>
                </v-card>
              </v-col>
            </v-row>
          </v-row>
        </v-col>

        <v-col
          v-if="!screenSize"
          :style="{ background: $vuetify.theme.themes.light.base }"
          md="5"
        >
          <Cart
            :cart-items="cartItems"
          />
        </v-col>
      </v-row>
    </v-layout>
  </div>
</template>
<script>
import axios from 'axios'
import { mdiPlus, mdiMinus } from '@mdi/js'
import { mapActions } from 'vuex'
import { mapMultiRowFields } from 'vuex-map-fields'
import image from '@/assets/image/nasi-goreng-jawa.jpeg'
import trash from '@/assets/image/Button.png'
import minus from '@/assets/image/minus-small.svg'
import Cart from './Cart.vue'
import HomeMobile from './HomeMobile.vue'

export default {
  components: {
    Cart,
    HomeMobile,
  },
  data() {
    return {
      items: [],
      itemsMobile: [],
      searchResult: null,
      search: '',
      image,
      trash,
      minus,
      mdiPlus,
      mdiMinus,
      dateNow: '',
      address: '',
      name: '',
      category: '',
      menu_id: 0,
      key: '',
    }
  },
  computed: {
    ...mapMultiRowFields('cart', ['cartItems']),
    getSearch() {
      return this.items.filter(detail => detail.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    screenSize() {
      return this.isMini()
    },
  },
  async mounted() {
    const key = window.location.href.split('/')[3]
    console.log(key, 'cek')
    await this.getData(key)
    await this.getDate()
    await this.getKey()
    this.toggleFull()

    // this.onAdd()
    this.isMini()
  },
  methods: {
    ...mapActions('cart', ['addCartItem']),
    getKey() {
      // eslint-disable-next-line prefer-destructuring

    },
    toggleFull(elem) {
      console.log(elem)
      this.elem = elem || document.documentElement

      if (
        !document.fullscreenElement
      && !document.mozFullScreenElement
      && !document.webkitFullscreenElement
      && !document.msFullscreenElement
      ) {
        if (elem.requestFullscreen) {
          elem.requestFullscreen()
        } else if (elem.msRequestFullscreen) {
          elem.msRequestFullscreen()
        } else if (elem.mozRequestFullScreen) {
          elem.mozRequestFullScreen()
        } else if (elem.webkitRequestFullscreen) {
          elem.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT)
        }
      } else if (document.exitFullscreen) {
        document.exitFullscreen()
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen()
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen()
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    },
    async getData(key) {
      axios
        .get(`https://wa-link.deploy.cbs.co.id/shop_data/${key}`)
        .then(res => {
          this.items = res.data.data.shop_data.menu
          this.address = res.data.data.shop_data.alamat
          this.name = res.data.data.shop_data.name
          this.itemsMobile = res.data.data.shop_data.menu
        })
    },
    getDate() {
      const timelaps = new Date()
      this.dateNow = timelaps.toDateString()
    },

    // eslint-disable-next-line consistent-return
    async onAdd(product) {
      if (this.cartItems.length <= this.items.length) {
        const cartData = product
        cartData.qty = 0

        this.addCartItem(cartData)

        // await this.cartItems.push({
        //   category: product.category,
        //   menu_id: product.menu_id,
        //   image: product.image,
        //   name: product.name,
        //   price: product.price,
        //   description: product.description,
        // })
      }

      // console.log('lah', product)
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
.card-image {
  width: 15%;
  height: 60px;
}
.image-cart {
  width: 15%;
  height: 60px;
  min-width: 0%;
}
.text-cart {
  font-size: 12px;
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
</style>
