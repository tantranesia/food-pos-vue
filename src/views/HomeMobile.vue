<template>
  <v-card color="base" class="pa-3">
    <v-row
      v-for="item in itemsMobile"
      :key="item.menu_id"
      dense
    >
      <v-col
        md="6"
        sm="4"
        class="mx-auto mt-2"
      >
        <p class="white--text text-mobile font-weight-bold">
          {{ item.name }}
        </p>
         <p class="white--text text-mobile">
          {{ item.description }}
        </p>
        <p class="white--text text-mobile">
          Rp{{ item.price }}
        </p>
      </v-col>
      <v-col
        md="6"
        sm="5"
      >
        <v-img
          :src="item.image"
          class="rounded-lg mx-auto mt-2 mb-4"
          max-width="150px"
          max-height="100px"
        />
        <v-btn
          color="primary"
          block
          @click="onAdd()"
          rounded
        >
          Add
        </v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>
<script>
export default {
  name: 'HomeMobile',
  props: {
    itemsMobile: {
      type: Array,
      required: true,
    },
  },
  data() {},
}
</script>
<style scoped>
.text-mobile {
    font-size: 13px;
}
</style>
