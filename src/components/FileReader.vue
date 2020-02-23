<template>
  <q-uploader
    flat
    @added="getFile"
    bordered
    style="max-width: 100%"
    :filter="checkFileType"
    :hide-upload-btn="true"
  />
</template>

<script>
export default {
  name: 'FileReader',
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
      return files.filter((file) => file.type === 'text/plain');
    },
  },
};
</script>
