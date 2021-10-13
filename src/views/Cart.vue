<template>
  <v-row>
    <v-col class="pt-10">
      <p class="display-1 white--text">Orders #34562</p>
      <v-row class="button-group">
        <v-chip color="primary"> Dine-In </v-chip>
        <v-chip color="primary"> Take Away </v-chip>
        <v-chip color="primary"> Delivery </v-chip>
        <v-chip color="primary"> Reservation </v-chip>
      </v-row>
      <v-flex class="my-10">
        <v-row v-for="item in cartItems" :key="item.menu_id" dense>
          <v-col md="6" sm="2" class="mx-auto">
            <p class="white--text">
              {{ item.name }}
            </p>
            <p class="white--text">Rp{{ item.price }}</p>
          </v-col>
          <v-col md="6" sm="3">
            <v-img
              :src="item.image"
              class="rounded-lg mx-auto my-2"
              max-width="150px"
              max-height="100px"
            />
            <v-row class="my-3 justify-sapce-between button-cart" md="6" sm="3">
              <v-col md="2" sm="1">
                <v-icon color="primary">
                  {{ mdiPlus }}
                </v-icon>
              </v-col>
              <v-col md="2" sm="1">
                <div color="base">
                  <p class="white--text text-center card-cart">1</p>
                </div>
              </v-col>
              <v-col md="2" sm="1">
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
        <v-btn color="primary" class="my-10 button-order" block>
          Confirm Order
        </v-btn>
      </v-flex>
    </v-col>
  </v-row>
</template>
<script>
export default {
  data() {},
}
</script>
