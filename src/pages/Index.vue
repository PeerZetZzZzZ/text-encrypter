<template>
  <q-layout view="lHh Lpr lFf ">
    <q-page>
        <div class="row">
          <div class="col-4 text-center">
            <h1>Text Encrypter</h1>
            <h5>Universal text encryption tool using AES-256 (CBC) algorithm.</h5>
            <q-card class="q-ma-md">
              <q-card-section>
                <div class="text-h5">About</div>
              </q-card-section>
              <q-card-section class="text-left">
                 This tool allows to encrypt any kind of text data for protected storage.
                 It can be used for sensitive data encryption for example passwords or seeds. <br>
                 It uses AES CBC algorithm with 256 bits long key. <br>
                <b>
                  Data encrypted with that tool can be later decrypted using any
                  AES CBC implementation software/script.
                </b><br>
                <b class="text-red">
                  This tool just works in your browser so you can use it offline.
                  To maintain 100% privacy turn off internet connection.
                </b>
              </q-card-section>
              <q-card-section>
                <div class="text-h5">How it works</div>
              </q-card-section>
              <q-card-section class="text-left">
                1. Upload the <b>.txt</b> file with the content to encrypt. <br>
                2. Provide encryption key (WHICH YOU CANNOT FORGET). <br>
                3. Encrypt the data. <br>
                4. Download the encrypted data as the .txt file. <br>
                    Save it or print it. <br>
                    You can only decrypt the data using the encryption key you provided.
              </q-card-section>
            </q-card>
          </div>
          <div class="col-8 q-pa-md">
              <q-card>
                <div class="row justify-center">
                  <h3>Choose operation</h3>
                  <div class="col-12">
                    <q-btn-toggle
                      v-model="option"
                      spread
                      no-caps
                      color="white"
                      text-color="black"
                      @input="operationChanged"
                      :options="[
                        {label: 'ENCRYPT', value: 0, icon:'lock'},
                        {label: 'DECRYPT', value: 1, icon:'lock_open'}
                      ]"/>
                  </div>
                </div>
                <q-card-section>
                  <div class="row justify-center">
                    <div class="col-6">
                      <encrypt-form v-if="option === 0" @onEncryptionResult="onEncryptionResult">
                      </encrypt-form>
                      <decrypt-form v-if="option === 1" @onDecryptionResult="onDecryptionResult">
                      </decrypt-form>
                    </div>
                    <div class="col-6">
                      <operation-result :result-content="resultContent"
                                        :result-file-name="getResultFileName()">
                      </operation-result>
                    </div>
                  </div>
                </q-card-section>
              </q-card>
          </div>
        </div>
    </q-page>
  </q-layout>
</template>

<script>

import EncryptForm from '../components/EncryptForm';
import DecryptForm from '../components/DecryptForm';
import OperationResult from '../components/OperationResult';

export default {
  name: 'PageIndex',
  components: { OperationResult, DecryptForm, EncryptForm },
  data() {
    return {
      option: 0,
      resultContent: 'No result yet.',
    };
  },
  methods: {
    operationChanged() {
      this.resultContent = 'No result yet.';
    },
    onEncryptionResult(encryptedData) {
      this.resultContent = encryptedData;
    },
    onDecryptionResult(decryptedData) {
      this.resultContent = decryptedData;
    },
    getResultFileName() {
      if (this.option === 0) {
        // eslint-disable-next-line
        return 'text-encrypter-ENCRYPTED.txt';
        // eslint-disable-next-line
      } else  {
        // eslint-disable-next-line
        return 'text-encrypter-DECRYPTED.txt';
      }
    },
  },

};
</script>
