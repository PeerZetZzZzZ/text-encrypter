<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title v-if="!$q.platform.is.mobile" class="custom-font">
          Text Encrypter
        </q-toolbar-title>

        <div>v2.0.0
          <a href="https://mobycrypt.com" target="_blank" style="color: white"> </a>
          | made by <a href="https://mobycrypt.com" target="_blank" style="color: white">mobycrypt.com</a></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
