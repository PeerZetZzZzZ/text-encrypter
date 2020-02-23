<template>
  <div>
    <saved-file-dialog :file-saved="fileSavedShowPopup" :text-content="saveSuccessDialogMessage">
    </saved-file-dialog>
    <q-btn color="primary" icon="save_alt" label="Save as file" @click="saveFile"/>
  </div>
</template>

<script>
import { saveAs } from 'file-saver';
import SavedFileDialog from './SavedFileDialog';

export default {
  name: 'FileSaver',
  components: { SavedFileDialog },
  data() {
    return {
      fileSavedShowPopup: false,
      saveSuccessDialogMessage: 'Before you quit for peace of mind assure that everything worked as expected and saved file is correct.',
    };
  },
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
      this.fileSavedShowPopup = !this.fileSavedShowPopup;
    },
  },
};
</script>
