  <template>
  <q-card :class="$q.platform.is.mobile ? '': 'q-ma-md'">
    <saved-file-dialog :error="true" :show="showPopup" :text-content="errorPopupMessage">
    </saved-file-dialog>
    <q-card-section>
      <div class="row justify-center">
        <div class="col-auto">
          <div class="q-pb-md text-primary"
               :class="$q.platform.is.mobile ? 'text-h4': 'text-h3'">
            <q-icon name="lock" :style="$q.platform.is.mobile ?
            'font-size: 3rem': 'font-size:4.5rem'">
            </q-icon>
            Encrypt
          </div>
        </div>
      </div>
      <div class="row q-pb-md">
        <div class="col-lg-12 col-xs-grow">
          <q-btn-toggle
            v-model="option"
            spread
            no-caps
            text-color="black"
            :options="[
              {label: 'Read from file', value: 0, icon:'attach_file'},
              {label: 'Paste data', value: 1, icon:'create'}
            ]"/>
        </div>
      </div>
      <div class="row" v-if="option === 0">
        <div class="col-lg-12 col-xs-grow">
          <span class="text-subtitle2 text-primary text-bold">
           1. Data file .txt to encrypt (text/plain only)
          </span>
          <file-reader @onFileUploaded="fileUploaded"></file-reader>
        </div>
      </div>
      <div class="row" v-if="option === 1">
        <div class="col-lg-12 col-xs-grow">
            <span class="text-subtitle2 text-primary text-bold">
           1. Text data to encrypt
          </span>
          <q-input
            style="max-height:300px;"
            v-model="dataToEncrypt"
            filled
            rows="30"
            type="textarea"
          />
        </div>
      </div>
      <div class="row items-center q-pt-md">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
           2. Encryption algorithm setup (readonly)
          </span><br>
          <q-checkbox :value="true" label="AES-256 CBC algorithm" :disable="true">
            <q-tooltip content-style="font-size: 14px">
              AES CBC algorithm based on 256 bit long key is
              considered as secure encryption algorithm.
            </q-tooltip>
          </q-checkbox><br>
          <q-checkbox :value="true" label="Random IV vector generation" :disable="true">
            <q-tooltip content-style="font-size: 14px">
              16 bytes long IV vector is required part of AES CBC encryption.
              The value will be randomly generated.
            </q-tooltip>
          </q-checkbox><br>
          <q-checkbox :value="true" label="PKCS7 payload padding" :disable="true">
            <q-tooltip content-style="font-size: 14px">
              Padding is adding missing bytes to the encryption payload
              in order to match the required data size (in AES-256 CBC
              data is divided on 16 bytes blocks). <br>
              PKCS7 padding is commonly used.
            </q-tooltip>
          </q-checkbox>
        </div>
      </div>
      <div class="row items-center q-pt-md">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
           3. Hash password
          </span><br>
          <q-toggle v-model="useSha256" label="Use SHA-256 hashing password"
                      @input="sha256Changed">
            <q-tooltip content-style="font-size: 14px">
              Your password will be hashed using SHA-256 producing the 256 bits
              long checksum directly used as encryption key. <br>
              Hashing your password enables you to use every length of encryption key
              (password) since hash of your key will be always 256 bit long.
            </q-tooltip>
          </q-toggle>
        </div>
      </div>
      <div class="row q-pt-md">
        <div class="col-12">
          <span class="text-subtitle2 text-primary text-bold">
           4. Encryption key/password ({{passwordHint}})
          </span>
          <q-input bottom-slots v-model="encryptionKey"
                   :type="isPwd ? 'password' : 'text'"
                   label="Encryption key" counter :maxlength="maxlength">
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
            <q-tooltip content-style="font-size: 14px">
              If you didn't choose to use SHA-256 checksum of your password
              (which is 256 bits long no matter of the input length) <br>
              then password must contain 32 characters
              (UTF-8 character has 8 bits * 32 = 256 bits).
            </q-tooltip>
          </q-input>
          <q-input bottom-slots v-model="encryptionKey2"
                   :type="isPwd ? 'password' : 'text'"
                   label="Repeat encryption key" counter :maxlength="maxlength">
            <template v-slot:prepend>
              <q-icon name="vpn_key"/>
            </template>
            <template v-slot:append>
              <q-icon
                :name="isPwd2 ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd2 = !isPwd2"
              />
            </template>
          </q-input>
        </div>
      </div>
      <div class="row justify-center text-center items-center q-pt-md">
        <div class="col-grow">
          <q-btn color="primary" icon="lock" label="Encrypt" @click="encrypt"
              :disable="encryptionKey === null ||
                    encryptionKey2 === null ||
                    encryptionKey !== encryptionKey2 ||
                    dataToEncrypt === null ||
                    (!useSha256 && encryptionKey.length !== 32)"
           />
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { encryptSymmetricCbc, generateRandomIvVectorHex } from '../api/encryption-service';
import FileReader from './FileReader';
import { generateEncryptionResult } from '../api/result-generator-service';
import SavedFileDialog from './SavedFileDialog';
import { isAscii } from '../api/ascii-service';

export default {
  name: 'EncryptForm',
  components: { SavedFileDialog, FileReader },
  data() {
    return {
      option: 0,
      cbc: true,
      useSha256: false,
      maxlength: 32,
      encryptionKey: null,
      encryptionKey2: null,
      dataToEncrypt: null,
      encryptedFileContent: null,
      passwordHint: 'encryption key must be 32 characters long',
      isPwd: true,
      isPwd2: true,
      errorPopupMessage: 'Encryption password must contain only ASCII characters, please fix.',
      showPopup: false,
    };
  },
  methods: {
    fileUploaded(fileContent) {
      this.dataToEncrypt = fileContent;
    },
    sha256Changed(value) {
      if (value) {
        this.passwordHint = 'encryption key will be SHA-256 checksum of your password';
        this.maxlength = 'No restrictions, no limit.';
      } else {
        this.passwordHint = 'encryption key must be 32 characters long';
        this.maxlength = 32;
      }
    },
    encrypt() {
      if (!isAscii(this.encryptionKey)) {
        this.showPopup = !this.showPopup;
      } else {
        const ivHex = generateRandomIvVectorHex();
        this.encryptedFileContent = encryptSymmetricCbc(
          this.dataToEncrypt,
          this.encryptionKey,
          ivHex,
          this.useSha256,
        );
        this.$emit('onEncryptionResult', generateEncryptionResult(
          this.encryptedFileContent,
          ivHex,
          this.useSha256,
        ));
      }
    },
  },
};
</script>
