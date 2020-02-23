<template>
  <q-layout view="lHh Lpr lFf ">
    <q-page>
        <div class="row">
          <div class="col-lg-4 col-xs-grow text-center">
            <img src="statics/text-encrypter.png" class="q-pa-x" style="max-width: 100%"/>
            <q-card class="q-ma-md">
              <q-card-section>
                <div class="text-h4 custom-font">About</div>
              </q-card-section>
              <q-card-section class="text-left text-subtitle1 custom-font">
                 This tool allows to encrypt (and decrypt) any kind of text
                 data for protected storage. <br>
                 It can be used for sensitive data encryption for example passwords or seeds. <br>
                 It uses AES CBC algorithm with 256 bits long key. <br>
                <span class="text-bold">
                  Data encrypted with that tool can be later decrypted using any
                  AES-256 CBC implementation software/script.
                </span><br>
              </q-card-section>
              <q-card-section>
                <div class="text-h4 custom-font">How it works</div>
              </q-card-section>
              <q-card-section class="text-left text-subtitle1 custom-font">
                1. Paste text or upload the <b>.txt</b> file with the data content to encrypt. <br>
                2. Provide encryption key (WHICH YOU CANNOT FORGET). <br>
                3. Encrypt the data. <br>
                4. Download the encrypted data as the .txt file. Save it or print it. <br>
                <span class="text-bold">
                  You can only decrypt the data using the encryption key you provided.
                </span>
              </q-card-section>
              <q-separator />
              <q-card-section>
                  <span class="text-bold text-red text-subtitle2 custom-font">
                  This tool works only in your browser so you can use it offline. <br>
                  To be sure your data are safe turn off internet connection
                  when encrypting/decrypting the data.
                </span>
              </q-card-section>
              <q-separator />
              <q-card-section>
                <a href="https://github.com/PeerZetZzZzZ/text-encrypter" target="_blank" style="color: black"
                   class="text-bold custom-font">
                  Find on GitHub <i class="fab fa-github"></i>
                </a>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-lg-8 col-xs-grow" :class="$q.platform.is.mobile ? '': 'q-pa-md'">
              <q-card>
                <div class="row justify-center">
                  <h3 class="text-center">Choose operation</h3>
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
                    <div class="col-lg-6 col-xs-grow"
                         :class="$q.platform.is.mobile ? 'q-pb-md': ''">
                      <encrypt-form v-if="option === 0" @onEncryptionResult="onEncryptionResult">
                      </encrypt-form>
                      <decrypt-form v-if="option === 1" @onDecryptionResult="onDecryptionResult">
                      </decrypt-form>
                    </div>
                    <div class="col-lg-6 col-xs-grow">
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
        return `text-encrypter-ENCRYPTED-${new Date().getTime()}.txt`;
        // eslint-disable-next-line
      } else  {
        // eslint-disable-next-line
        return `text-encrypter-DECRYPTED-${new Date().getTime()}.txt`;
      }
    },
  },

};
</script>
