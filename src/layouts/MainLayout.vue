<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>

        <q-toolbar-title>
          Text Encrypter
        </q-toolbar-title>

        <div>v1.0 |
          <a href="https://pthomann.pl" target="_blank" style="color: white"> Find on GitHub <i class="fab fa-github"></i></a>
          | made by Przemysław Thomann <a href="https://pthomann.pl" target="_blank" style="color: white">pthomann.pl</a></div>
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
