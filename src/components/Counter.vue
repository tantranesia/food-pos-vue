<template>
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
        @click="increaseCounter(20)"
      >
        {{ mdiPlus }}
      </v-icon>
    </v-col>
    <v-col
      md="2"
      sm="1"
      class="mx-5"
    >
      <div color="base">
        <p class="white--text text-center card-cart">
          {{ counter }}
        </p>
      </div>
    </v-col>
    <v-col
      md="2"
      sm="1"
    >
      {{ mdiMinus }}
      <v-icon color="primary">
      </v-icon>
    </v-col>
  </v-row>
</template>
<script>
import { mdiPlus, mdiMinus } from '@mdi/js'

export default {
  name: 'Counter',
  data() {
    return {
      counter: 0,
      mdiPlus,
      mdiMinus,
    }
  },
  methods: {
    increaseCounter(increaseLimit) {
      // eslint-disable-next-line no-plusplus
      if (this.counter < increaseLimit) this.counter++
    },
  },
}
</script>
