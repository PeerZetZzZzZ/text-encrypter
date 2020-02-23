<template>
  <q-card class="q-ma-md">
    <q-card-section>
      <h3>Result</h3>
      <div class="q-ma-md" style="max-width: 100%;;">
        <q-input
          style="max-height:520px;"
          v-model="resultContent"
          filled
          rows="50"
          type="textarea"
          readonly
        />
      </div>
      <div class="row justify-center text-center items-center q-mt-md">
        <div class="col-grow">
          <file-saver :file-content="resultContent"
                      :file-name="resultFileName"
                      v-if="resultContent !== null">
          </file-saver>
        </div>
      </div>
    </q-card-section>
  </q-card>

</template>

<script>
import FileSaver from './FileSaver';

export default {
  name: 'OperationResult',
  components: { FileSaver },
  props: {
    resultContent: {
      type: String,
    },
    resultFileName: {
      type: String,
    },
  },
};
</script>
