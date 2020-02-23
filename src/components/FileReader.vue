<template>
  <div>
    <saved-file-dialog :show="showPopup" :error="true" :text-content="errorMessage">
    </saved-file-dialog>
  <q-uploader
    flat
    @added="getFile"
    bordered
    style="max-width: 100%"
    :filter="checkFileType"
    :hide-upload-btn="true"
  />
  </div>
</template>

<script>
import SavedFileDialog from './SavedFileDialog';

export default {
  name: 'FileReader',
  components: { SavedFileDialog },
  data() {
    return {
      showPopup: false,
      errorMessage: 'Only files with .txt extension are accepted!',
    };
  },
  methods: {
    getFile(files) {
      const reader = new FileReader();
      reader.readAsText(files[0], 'UTF-8');
      reader.onload = (evt) => {
        console.log('Uploaded file successfully');
        this.$emit('onFileUploaded', evt.target.result);
      };
      reader.onerror = (evt) => {
        console.log('error', evt);
      };
    },
    checkFileType(files) {
      const res = files.filter((file) => file.type === 'text/plain');
      if (!res || res.length === 0) {
        this.showPopup = !this.showPopup;
      }
      return res;
    },
  },
};
</script>
