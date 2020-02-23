<template>
  <q-card :class="$q.platform.is.mobile ? '': 'q-ma-md'">
    <q-card-section>
      <div class="row">
        <div class="col-12">
          <div class="row justify-center">
            <div class="col-auto">
              <div class="text-h3 q-pb-md text-primary" >
                <q-icon name="lock_open" style="font-size: 4.5rem;"></q-icon>
                Decrypt
              </div>
            </div>
          </div>
          <span class="text-subtitle2 text-primary text-bold">
            1. Data file .txt to decrypt (text/plain only, encrypted using Text Encrypter).</span>
          <file-reader @onFileUploaded="fileUploaded"></file-reader>
        </div>
      </div>
      <div class="row items-center q-pt-md" v-if="decryptionFileJson.algorithm">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
            2. Encryption Algorithm.
          </span>
          <q-input v-model="decryptionFileJson.algorithm" readonly/>
        </div>
      </div>
      <div class="row items-center q-pt-md"
           v-if="decryptionFileJson.wasEncryptionKeySha256 !== undefined">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
            3. Was password hashed using sha-256.
          </span><br>
          <q-checkbox v-model="decryptionFileJson.wasEncryptionKeySha256"
                      label="Password hashed sha-256" :disable="true">
          </q-checkbox>
        </div>
      </div>
      <div class="row items-center q-pt-md" v-if="decryptionFileJson.ivVectorHex">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
            4. IV vector value (hex)
          </span><br>
          <q-input v-model="decryptionFileJson.ivVectorHex" readonly/>

        </div>
      </div>
      <div class="row items-center q-pt-md" v-if="decryptionFileJson.encryptionDate">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
            4. Encryption date
          </span><br>
          <q-input :value="decryptionFileJson.encryptionDate" readonly/>
        </div>
      </div>
      <div class="row q-pt-md" v-if="decryptionFileJson.encryptedDataHex">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
           4. Encryption key
          </span>
          <q-input bottom-slots v-model="encryptionKey"
                   :type="isPwd ? 'password' : 'text'"
                   label="Encryption key" counter>
            <template v-slot:prepend>
              <q-icon name="vpn_key"/>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-center text-center items-center q-pt-md">
        <div class="col-grow">
          <q-btn color="primary" icon="lock" label="Decrypt" @click="decrypt"
                 :disable="encryptionKey === null ||
                           decryptionFileJson.encryptedDataHex === null"
          />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { decryptSymmetricCbc } from '../api/encryption-service';
import FileReader from './FileReader';

export default {
  name: 'DecryptForm',
  components: { FileReader },
  data() {
    return {
      option: 0,
      cbc: true,
      isPwd: true,
      useSha256: false,
      encryptionKey: null,
      encryptionKey2: null,
      decryptedFileContent: null,
      decryptionFileJson: {},
    };
  },
  methods: {
    fileUploaded(fileContent) {
      this.decryptionFileJson = JSON.parse(fileContent);
    },
    decrypt() {
      this.decryptedFileContent = decryptSymmetricCbc(
        this.decryptionFileJson.encryptedDataHex,
        this.encryptionKey,
        this.decryptionFileJson.ivVectorHex,
        this.decryptionFileJson.wasEncryptionKeySha256,
      );
      this.$emit('onDecryptionResult', this.decryptedFileContent);
    },
  },
};
</script>
