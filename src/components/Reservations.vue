<template>
  <v-form @submit="handleSubmit">
    <v-col>
      <v-row class="mx-2">
        <v-menu
          ref="menu"
          v-model="menu"
          :close-on-content-click="false"
          :return-value.sync="date"
          transition="scale-transition"
          offset-y
          min-width="auto"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="date"
              label="Picker in menu"
              prepend-icon="mdi-calendar"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker
            v-model="date"
            no-title
            scrollable
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              @click="menu = false"
            >
              Cancel
            </v-btn>
            <v-btn
              text
              color="primary"
              @click="$refs.menu.save(date)"
            >
              OK
            </v-btn>
          </v-date-picker>
        </v-menu>
        <v-menu
          ref="menu"
          v-model="menu2"
          :close-on-content-click="false"
          :nudge-right="40"
          :return-value.sync="time"
          transition="scale-transition"
          offset-y
          max-width="290px"
          min-width="290px"
        >
          <template v-slot:activator="{ on, attrs }">
            <v-text-field
              v-model="time"
              label="Picker in menu"
              prepend-icon="mdi-clock-time-four-outline"
              readonly
              v-bind="attrs"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="menu2"
            v-model="time"
            full-width
            @click:minute="$refs.menu.save(time)"
          ></v-time-picker>
        </v-menu>
        <v-row
          justify="space-around"
          align="center"
        >
        </v-row>
      </v-row>
      <v-row class="mx-2">
        <v-text-field
          v-model="guest"
          label="Guest"
        >
        </v-text-field>
        <v-text-field
          v-model="table"
          label="Table Number"
        >
        </v-text-field>
      </v-row>
      <v-text-field
        v-model="notes"
        label="Notes"
      >
      </v-text-field>
      <v-row class="justify-space-between mx-2">
        <p>Discount</p>
        <p>0</p>
      </v-row>
      <v-row class="justify-space-between mx-2">
        <p>Sub Total</p>
        <p>Rp350000</p>
      </v-row>
      <v-btn
        color="primary"
        class="my-10 button-order"
        block
        type="submit"
      >
        Confirm Order
      </v-btn>
    </v-col>
  </v-form>
</template>
<script>
import axios from 'axios'
import { mapMultiRowFields } from 'vuex-map-fields'

export default {
  name: 'Reservation',
  data() {
    return {
      guest: 0,
      table: 0,
      notes: '',
      date: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
      time: null,
      menu: false,
      menu2: false,
    }
  },
  computed: {
    ...mapMultiRowFields('cart', ['cartItems']),
  },
  methods: {
    handleSubmit(e) {
      console.log(this.cartItems, 'cek cart newS')
      e.preventDefault()
      const timestamp = Date.now()
      const baseURL = 'https://wa-link.deploy.cbs.co.id/SN4TCROYT-OE4QB/order'
      const body = {
        order_item: this.cartItems.map(col => ({ name: col.name, qty_order: col.qty })),
        order_type: 'Reservation',
        notes: this.notes,
        guest: this.guest,
        table_number: this.table,
        order_date: this.date,
        order_time: this.time,
        timestamp,

      }

      axios.post(baseURL, body).then(res => {
        console.log(res)
        window.open(`https://wa.me/${res.data.link}`, '_blank')
      }).catch(err => {
        console.log(err)
      })
    },

  },
}
</script>
