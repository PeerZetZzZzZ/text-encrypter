<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title v-if="!$q.platform.is.mobile" class="custom-font">
          Text Encrypter
        </q-toolbar-title>

        <div>v1.0.6
          <a href="https://pthomann.pl" target="_blank" style="color: white"> </a>
          | made by Przemysław Thomann <a href="https://pthomann.pl/en" target="_blank" style="color: white">pthomann.pl</a></div>
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
