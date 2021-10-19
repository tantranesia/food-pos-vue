// eslint-disable-next-line import/no-extraneous-dependencies
import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import preset from '@/@core/preset/preset'

Vue.use(Vuetify)

export default new Vuetify({
  preset,
  icons: {
    iconfont: 'mdi',
  },
  theme: {
    options: {
      customProperties: true,
      variations: false,
    },
  },
})
