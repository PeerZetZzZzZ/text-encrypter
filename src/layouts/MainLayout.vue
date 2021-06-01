<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title v-if="!$q.platform.is.mobile" class="custom-font">
          Text Encrypter
        </q-toolbar-title>

        <div>v1.0.7
          <a href="https://mobycrypt.com" target="_blank" style="color: white"> </a>
          | made by Przemysław Thomann <a href="https://mobycrypt.com" target="_blank" style="color: white">mobycrypt.com</a></div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MainLayout',

  components: {
  },

  data() {
    return {
    };
  },
};
</script>
