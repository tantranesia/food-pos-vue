<template>
  <v-col
    :style="{ background: $vuetify.theme.themes.light.black }"
    position="relative"
  >
    <v-row>
      <p class="display-1 white--text text--darken-2 mx-5 mt-10">
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
    <v-col>
      <v-card
        color="base"
        class="pa-3 card-body"
      >
        <v-row
          v-for="itemMobile in getSearch"
          :key="itemMobile.menu_id"
          dense
        >
          <v-col
            md="6"
            sm="4"
            class="mx-auto mt-2"
          >
            <p class="white--text text-mobile font-weight-bold">
              {{ itemMobile.name }}
            </p>
            <p class="white--text text-mobile">
              {{ itemMobile.description }}
            </p>
            <p class="white--text text-mobile">
              Rp{{ itemMobile.price }}
            </p>
          </v-col>
          <v-col
            md="6"
            sm="5"
            class="card-items-mobile"
          >
            <v-img
              :src="itemMobile.image"
              class="rounded-lg mx-auto mt-2 mb-4"
              max-width="120px"
              max-height="100px"
            />
            <v-btn
              color="primary"
              rounded
              class="ml-12 mb-8"
              @click="onAdd(itemMobile)"
            >
              Add
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
    <v-col
      v-if="screenSize"
      md="5"
      sm="3"
    >
      <v-dialog transition="dialog-bottom-transition">
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="primary"
            v-bind="attrs"
            rounded
            class="button-total"
            v-on="on"
          >
            <v-row>
              <v-col>
                <p class="base--text mt-3 font-weight-bold">
                  {{ totalItems }} Items
                </p>
              </v-col>
              <v-col class="base--text mt-3 font-weight-bold">
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
                <v-chip
                  color="primary"
                  @click="selectedButton('Dine-In')"
                >
                  Dine-In
                </v-chip>
                <v-chip
                  color="primary"
                  @click="selectedButton('Take Away')"
                >
                  Take Away
                </v-chip>
                <v-chip
                  color="primary"
                  @click="selectedButton('Delivery')"
                >
                  Delivery
                </v-chip>
                <v-chip
                  color="primary"
                  @click="selectedButton('Reservation')"
                >
                  Reservation
                </v-chip>
              </v-row>
              <v-flex class="my-10">
                <v-col
                  v-for="(item, index) in cartItems"
                  :key="index"
                >
                  <v-row
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
                    </v-col>
                  </v-row>
                  <v-row
                    class="my-3 justify-sapce-between button-cart"
                    md="6"
                    sm="3"
                  >
                    <v-col
                      md="2"
                      sm="1"
                    >
                      <v-icon
                        color="primary"
                        @click="increaseItemQty(index)"
                      >
                        mdi mdi-plus
                      </v-icon>
                    </v-col>
                    <v-col
                      md="2"
                      sm="1"
                      class="mx-5"
                    >
                      <div color="base">
                        <p class="white--text text-center card-cart">
                          {{ item.qty }}
                        </p>
                      </div>
                    </v-col>
                    <v-col
                      md="2"
                      sm="1"
                    >
                      <v-icon
                        color="primary"
                        @click="descreaseItemQty(index)"
                      >
                        mdi mdi-minus
                      </v-icon>
                    </v-col>
                  </v-row>
                </v-col>
                <delivery
                  v-if="selected === 'Delivery'"
                  data-key="Delivery"
                />
                <reservation
                  v-else-if="selected === 'Reservation'"
                  data-key="Reservation"
                />
                <take-away
                  v-else-if="selected === 'Take Away'"
                  data-key="Take Away"
                />
                <dine-in
                  v-else
                  data-key="Dine-in"
                />
              </v-flex>
            </v-col>
          </v-card>
        </template>
      </v-dialog>
    </v-col>
  </v-col>
</template>
<script>
import { mapActions } from 'vuex'
import { mapMultiRowFields } from 'vuex-map-fields'
import DineIn from '@/components/DineIn.vue'
import Delivery from '@/components/Delivery.vue'
import Reservation from '@/components/Reservations.vue'
import TakeAway from '@/components/TakeAway.vue'

export default {
  name: 'HomeMobile',
  components: {
    DineIn,
    Delivery,
    Reservation,
    TakeAway,
  },
  props: {
    itemsMobile: {
      type: Array,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    dateNow: {
      type: String,
      required: true,
    },
    items: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      search: '',
      totalItems: 0,
      selected: '',
    }
  },
  computed: {
    ...mapMultiRowFields('cart', ['cartItems']),
    getSearch() {
      return this.itemsMobile.filter(detail => detail.name.toLowerCase().includes(this.search.toLowerCase()))
    },
    screenSize() {
      return this.isMini()
    },
  },
  methods: {
    ...mapActions('cart', ['addCartItem']),
    increaseItemQty(index) {
      const { qty } = this.cartItems[index]
      console.log(qty)
      this.cartItems[index].qty = qty + 1
      console.log(this.cartItems)
    },
    descreaseItemQty(index) {
      const { qty } = this.cartItems[index]
      if (qty > 0) {
        this.cartItems[index].qty = qty - 1
      }
      if (qty === 0) {
        this.cartItems.splice(index, 1)
      }
    },
    selectedButton(value) {
      this.selected = value
      console.log(this.selected)
    },
    async onAdd(product) {
      if (this.cartItems.length <= this.items.length) {
        const cartData = product
        cartData.qty = 0

        this.addCartItem(cartData)
      }
      this.totalItems = this.cartItems.length

      console.log('lah', product)
      console.log('cart items', this.cartItems)
    },
    async isMini() {
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
.text-mobile {
  font-size: 14px;
}
.card-items-mobile {
  justify-items: center;
  align-items: center;
}
.button-total {
    position: fixed;
    bottom: 0;
    width: 90%;
    margin-bottom: 25px ;
}
</style>
