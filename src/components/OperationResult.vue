<template>
  <q-card :class="$q.platform.is.mobile ? '' : 'q-ma-md'">
    <q-card-section>
      <div class="row justify-center">
        <div class="col-auto">
          <div class="q-pb-md text-primary" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h3'">
            Result
          </div>
        </div>
      </div>
      <div :class="$q.platform.is.mobile ? '' : 'q-ma-md'">
        <q-input
          v-model="localResultContent"
          filled
          class="limited-textarea-bigger"
          type="textarea"
          readonly
        />
      </div>
      <div class="row justify-center text-center items-center q-mt-md">
        <div class="col-grow">
          <file-saver :file-content="localResultContent" :file-name="resultFileName"></file-saver>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import FileSaver from './FileSaver.vue';

export default {
  name: 'OperationResult',
  components: { FileSaver },
  props: {
    resultContent: {
      type: String,
      required: true,
    },
    resultFileName: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      localResultContent: this.resultContent,
    };
  },
  watch: {
    resultContent(newContent) {
      this.localResultContent = newContent;
    },
  },
};
</script>
