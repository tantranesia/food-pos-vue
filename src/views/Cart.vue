<template>
  <v-row color="base">
    <v-col class="pt-10">
      <p class="display-1 white--text">
        Orders #34562
      </p>
      <v-row class="button-group">
        <v-chip
          color="primary"
          class="mx-3"
          @change="selectedButton('Dine-In')"
        >
          Dine-In
        </v-chip>
        <v-chip
          color="primary"
          class="mx-3"
          @change="selectedButton('Take Away')"
        >
          Take Away
        </v-chip>
        <v-chip
          color="primary"
          class="mx-3"
          @change="selectedButton('Delivery')"
        >
          Delivery
        </v-chip>
        <v-chip
          v-model="selected"
          color="primary"
          class="mx-3"
          @click="selectedButton('Reservation')"
        >
          Reservation
        </v-chip>
      </v-row>
      <v-flex class="my-10">
        <v-row
          v-for="(item,index) in cartItems"
          :key="index"
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
              Rp{{ item.price * item.qty }}
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
          <v-row>
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
                  mdi-plus
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
                  mdi-minus
                </v-icon>
              </v-col>
            </v-row>
          </v-row>
        </v-row>
        <dine-in v-if="selected === 'Dine-In'" />
        <delivery v-if="selected === 'Delivery'" />
        <reservation v-if="selected === 'Reservation'" />
        <take-away v-if="selected === 'Take Away'" />
      </v-flex>
    </v-col>
  </v-row>
</template>
<script>
import { mapActions } from 'vuex'
import { mapMultiRowFields } from 'vuex-map-fields'
import DineIn from '@/components/DineIn.vue'
import Delivery from '@/components/Delivery.vue'
import Reservation from '@/components/Reservations.vue'
import TakeAway from '@/components/TakeAway.vue'

export default {
  name: 'Cart',
  components: {
    DineIn,
    Delivery,
    Reservation,
    TakeAway,
  },
  props: {
    cartItems: {
      type: Array,
      required: true,
    },
  },
  data() {
    console.log(this.cartItems, 'cek di cart')
    this.subTotal = parseInt(this.counter * this.cartItems.price, 10)
    console.log(this.subTotal)
    this.items = ['Dine-In', 'Take Away', 'Delivery', 'Reservation']

    return {
      subTotal: 0,
      arr: [this.cartItems.length],
      selected: '',
      items: [],
    }
  },
  computed: {
    ...mapMultiRowFields('cart', ['cartItems']),
  },
  methods: {
    ...mapActions('cart', ['addCartItem']),
    increaseItemQty(index) {
      const { qty } = this.cartItems[index]
      this.cartItems[index].qty = qty + 1
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
    },
    toggleDineIn() {
      this.dinein = !this.dinein
    },
    toggleDelivery() {
      this.delivery = !this.delivery
    },
    toggleReservation() {
      this.reservation = !this.reservation
    },
    toggleTakeAway() {
      this.takeaway = !this.takeaway
    },
  },
}
</script>
<style scoped>
.button-group {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
