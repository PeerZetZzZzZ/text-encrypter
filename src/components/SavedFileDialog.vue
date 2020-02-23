<template>
  <q-dialog persistent v-model="showPopup" v-if="showPopup" @hide="showPopup=false">
    <q-card>
      <q-card-section>
        <div class="row justify-center">
          <div class="col-grow text-center">
            <div class="text-h4 q-pb-md text-primary" v-if="!error">
              <q-icon name="done_outline" style="font-size: 4rem;"></q-icon>
              Operation succeed
            </div>
            <div class="text-h4 q-pb-md text-primary text-red" v-if="error">
              <q-icon name="block" style="font-size: 4rem;"></q-icon>
              Operation failed
            </div>
          </div>
        </div>
      </q-card-section>
      <q-card-section class="q-pt-none text-center">
        <span class="text-subtitle1">
          {{textContent}}
        </span>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn label="Close" color="primary" v-close-popup/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
</style>

<script>

export default {
  name: 'SavedFileDialog',
  components: {},
  props: {
    textContent: {
      type: String,
    },
    error: {
      type: Boolean,
      default: false,
    },
    fileSaved: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showPopup: false,
    };
  },
  watch: {
    fileSaved() {
      this.showPopup = true;
    },
  },
};
</script>
