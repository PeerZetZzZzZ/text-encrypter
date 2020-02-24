<template>
  <q-card :class="$q.platform.is.mobile ? '': 'q-ma-md'">
    <q-card-section>
      <div class="row justify-center">
        <div class="col-auto">
          <div class="text-h3 q-pb-md text-primary" >
            Result
          </div>
        </div>
      </div>
      <div :class="$q.platform.is.mobile ? '': 'q-ma-md'">
        <q-input
          style="max-height:600px;"
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
                      :disabled="resultContent === null ||
                                 resultContent === 'No result yet.'">
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
