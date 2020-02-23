<template>
  <q-btn color="primary" icon="save_alt" label="Save as file" @click="saveFile"/>
</template>

<script>
import { saveAs } from 'file-saver';

export default {
  name: 'FileSaver',
  props: {
    fileContent: {
      type: String,
    },
    fileName: {
      type: String,
    },
  },
  methods: {
    saveFile() {
      const blob = new Blob([this.fileContent], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, this.fileName);
    },
  },
};
</script>
