<template>
  <q-page class="bg-dark">
    <div class="row">
      <div class="col-lg-4 col-xs-grow text-center">
        <q-card class="bg-dark" :class="$q.platform.is.mobile ? 'q-mt-xs q-mb-xs' : 'q-ma-md'">
          <q-card-section>
            <img src="  TextEncrypter.png" :style="$q.platform.is.mobile ?
              'max-width: 70%;' : 'max-width: 415px; max-height: 244px'" />
            <h1 class="custom-font text-white q-my-none sidebar-title" :class="$q.platform.is.mobile ? 'text-h4' : ''">
              TEXT ENCRYPTER
            </h1>
            <div class="custom-font text-red sidebar-tagline" :class="$q.platform.is.mobile ? 'text-subtitle' : ''">
              FREE AND SECURE TEXT ENCRYPTER. <br>
              PRIVATE ENCRYPTION AND DECRYPTION IN YOUR BROWSER ONLY.
            </div>
          </q-card-section>
          <q-card-section style="padding-top: 0; margin-top: 0" class="text-left text-subtitle1 custom-font text-white">
            Text Encrypter allows to securely encrypt and decrypt any kind of text
            data for protected storage.
            It can be used for sensitive data encryption for example passwords or seeds.
            It uses secure AES CBC algorithm with 256 bits long key. <br>
            <span class="text-bold text-white">
              Data encrypted with Text Encrypter can be later decrypted using any
              AES-256 CBC implementation software or script.
            </span><br>
          </q-card-section>
          <q-card-section>
            <div class="text-h4 custom-font text-white">How it works</div>
          </q-card-section>
          <q-card-section class="text-left text-subtitle1 custom-font text-white">
            1. Paste text or upload the <b>.txt</b> file with the data content to encrypt. <br>
            2. Provide encryption key (WHICH YOU CANNOT FORGET). <br>
            3. Encrypt the data. <br>
            4. Download the encrypted data as the .txt file.
            Do not modify the content. Save it or print it. <br>
            5. For decryption upload the encrypted .txt file and provide encryption key. <br>
            <span class="text-bold">
              You can only decrypt the data using the encryption key you provided.
            </span>
          </q-card-section>
          <q-separator class="bg-white" />
          <q-card-section>
            <span class="text-bold text-red text-subtitle2 custom-font">
              Text Encrypter works only in your browser so you can use it offline. <br>
              To be sure your data is safe open the page in private mode tab <br>
              and turn off internet connection when encrypting/decrypting the data.
            </span>
          </q-card-section>
          <q-separator class="bg-white" />
          <q-card-section>
            <a href="https://github.com/PeerZetZzZzZ/text-encrypter" target="_blank" style="color: black"
              class="text-bold custom-font text-white">
              Find on GitHub <i class="fab fa-github"></i>
            </a>
            <br>
            <span class="text-white custom-font">textencrypter.com 2026</span>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-lg-8 col-xs-grow" :class="$q.platform.is.mobile ? '' : 'q-pa-md'">
        <q-card class="bg-dark">
          <q-card-section>
            <div class="text-center text-white q-pb-md" :class="$q.platform.is.mobile ? 'text-h4' : 'text-h4 '">
              Choose operation
            </div>
            <q-btn-toggle v-model="option" spread no-caps class="operation-toggle"
              :class="$q.platform.is.mobile ? '' : 'q-mr-md q-ml-md'" color="white" text-color="black" :options="[
                { label: 'ENCRYPT', value: 0, icon: 'lock' },
                { label: 'DECRYPT', value: 1, icon: 'lock_open' }
              ]" />
          </q-card-section>
          <q-card-section>
            <div class="row items-stretch">
              <div class="col-lg-6 col-xs-12 column" :class="$q.platform.is.mobile ? 'q-pb-md' : ''">
                <encrypt-form v-if="option === 0" @onEncryptionResult="onEncryptionResult" />
                <decrypt-form v-if="option === 1" @onDecryptionResult="onDecryptionResult" />
              </div>
              <div class="col-lg-6 col-xs-12 column">
                <operation-result :result-content="resultContent" :result-file-name="getResultFileName()" />
              </div>
            </div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12" :class="$q.platform.is.mobile ? 'q-pb-xs' : 'q-px-md q-pb-md'">
        <section class="seo-section" aria-labelledby="about-encryption-heading">
          <q-card class="bg-dark seo-section__card">
            <q-card-section class="seo-section__content text-white custom-font">
              <h2 id="about-encryption-heading" class="seo-section__title custom-font text-white q-pb-md">
                About data encryption
              </h2>
              <p>
                Data encryption transforms readable text into ciphertext that looks like random data.
                Without the correct password, an unauthorized person cannot recover the original
                content — even if they have the encrypted file. Only someone who knows the password
                used during encryption can decrypt it and read the data again.
              </p>
              <p>
                Text Encrypter lets you protect passwords, seed phrases, notes, or any plain text
                by encrypting content you paste or upload as a <strong>.txt</strong> file. The
                encrypted result is saved to your device; keep that file and your password safe,
                because both are required for decryption later.
              </p>

              <h3 class="seo-section__subtitle">When to encrypt data</h3>
              <p>
                You should encrypt data when you want to stop others from reading it — so that
                <strong>only the person who knows the password</strong> can view the original content.
                Encryption is useful whenever files might be seen by someone who should not have access.
              </p>
              <p>
                Consider encrypting data stored in places others can reach, for example a
                <strong>shared computer</strong>, a <strong>family PC</strong>, a
                <strong>shared network drive</strong>, or <strong>cloud storage</strong> such as
                Google Drive, iCloud, Dropbox, or any similar service. Even if others can open the
                folder or download the file, they will only see encrypted text without your password.
              </p>
              <p>
                Text Encrypter is well suited for sensitive information: <strong>passwords</strong>,
                <strong>recovery seed phrases</strong>, PIN codes, private notes, backup codes, and
                other confidential text you need to keep somewhere safe but not readable at a glance.
              </p>

              <h3 class="seo-section__subtitle">How AES-256-CBC works in TextEncrypter</h3>
              <p>
                By default, Text Encrypter hashes your password with <strong>SHA-256</strong> to
                produce a 256-bit key, then encrypts your data with <strong>AES-256-CBC</strong>.
                AES (Advanced Encryption Standard) with a 256-bit key is widely used and considered
                secure when implemented correctly. CBC mode combines each block of data with a unique
                random <strong>IV (initialization vector)</strong> so the same plaintext never
                produces the same ciphertext twice. <strong>PKCS7 padding</strong> ensures the data
                length matches what AES expects.
              </p>
              <p>
                Text Encrypter is <strong>open source</strong> and built on well-known, public
                encryption standards. The same methods are supported by many libraries and tools
                in different programming languages, so the process is transparent and can be
                verified or reimplemented by anyone. Source code is available on
                <a href="https://github.com/PeerZetZzZzZ/text-encrypter" target="_blank"
                  class="text-white text-bold">GitHub</a>.
              </p>
              <p>
                The encrypted <strong>.txt</strong> file that Text Encrypter saves to your disk is a
                JSON document with the essential details needed to decrypt it: the algorithm
                (<strong>aes-256-cbc</strong>), the encrypted payload, the <strong>IV</strong>,
                whether the password was hashed with <strong>SHA-256</strong>, and the padding
                scheme. Because this information is included in the file, anyone can write
                compatible decryption software in any technology — but the <strong>password is still
                  required</strong> to recover the original data.
              </p>

              <h3 class="seo-section__subtitle">Is data encryption safe and secure?</h3>
              <p>
                In Text Encrypter, security depends on how the app works: your password is never
                sent anywhere — it is hashed with <strong>SHA-256</strong> in your browser to derive
                the encryption key, and your data is encrypted with <strong>AES-256-CBC</strong>
                before the result is downloaded. An attacker who steals only the encrypted file cannot
                read it without guessing the correct password. With SHA-256 enabled, they must find a
                password whose hash matches the key used for encryption; the hash itself cannot be
                reversed to reveal the password.
              </p>
              <p>
                For a <strong>random 10-character password</strong> using printable ASCII characters
                (~95 options per character), there are roughly <strong>10<sup>19</sup> possible
                  passwords</strong> (about 59 quintillion). Even at billions of guesses per second on
                powerful hardware, hitting the correct password by brute force would take on the order
                of <strong>many thousands to millions of years</strong>. That is why Text Encrypter
                is safe for strong passwords — but real-world attacks target weak or common passwords
                first, so use a long, random password for sensitive data.
              </p>

              <q-banner rounded class="encryption-strength-banner text-white q-mt-lg q-mb-md">
                <template #avatar>
                  <q-icon name="gpp_bad" color="negative" :size="$q.platform.is.mobile ? 'md' : 'lg'" />
                </template>

                <div class="encryption-strength-banner__title custom-font text-weight-bold">
                  TextEncrypter encryption
                </div>
                <div class="encryption-strength-banner__stat q-mt-sm custom-font">
                  <span>10-character password</span>
                  <q-icon name="arrow_forward" size="xs" class="q-mx-xs" />
                  <span class="encryption-strength-banner__number">10 000 000 000 000 000 000</span>
                  <span class="q-ml-xs encryption-strength-banner__power">(10<sup>19</sup>)</span>
                  <span class="q-ml-sm">possible passwords to try</span>
                </div>
              </q-banner>

              <h3 class="seo-section__subtitle">Privacy and security</h3>
              <p>
                Text Encrypter does <strong>not store your data</strong>, does
                <strong>not track you</strong>, and uses no analytics on your plaintext or passwords.
                All encryption and decryption runs <strong>locally in your browser</strong>. You can
                use the app offline after loading the page, and for maximum peace of mind, open it in
                a private browsing tab and disconnect from the internet while working with sensitive
                content.
              </p>
            </q-card-section>
          </q-card>
        </section>

        <section class="seo-section q-mt-md" aria-labelledby="changelog-heading">
          <q-card class="bg-dark seo-section__card">
            <q-card-section class="seo-section__content text-white custom-font">
              <h2 id="changelog-heading" class="seo-section__title custom-font text-white q-mb-md">
                Changelog
              </h2>

              <h3 class="seo-section__subtitle">Version 2.1.0 — August 2026</h3>
              <ul class="seo-section__list">
                <li>Refreshed page layout with a cleaner dark theme and improved spacing.</li>
                <li>New sections at the bottom explain how encryption works and why your data stays private.</li>
                <li>Updated all underlying app libraries to their latest stable versions — better security, stability,
                  and
                  compatibility with modern browsers.</li>
                <li>No action needed on your side: open the page as usual. We recommend an up-to-date browser (Chrome,
                  Firefox,
                  Edge, or Safari).</li>
                <li>The encryption method is unchanged — passwords, file format, and files created with older versions
                  of Text
                  Encrypter still work.</li>
              </ul>
            </q-card-section>
          </q-card>
        </section>
      </div>
    </div>
  </q-page>
</template>

<script>

import { useMeta } from 'quasar';
import EncryptForm from '../components/EncryptForm.vue';
import DecryptForm from '../components/DecryptForm.vue';
import OperationResult from '../components/OperationResult.vue';

const SITE_URL = 'https://textencrypter.com';
const PAGE_TITLE = 'Text Encrypter - free and privacy secure browser text encryption tool';
const PAGE_DESCRIPTION = 'Universal text data encryption and decryption tool based on AES-256 CBC. Encrypt text or custom files. Privacy secure encryption in your browser only.';
const OG_IMAGE = `${SITE_URL}/icons/web-app-manifest-512x512.png`;
const OG_IMAGE_WIDTH = '512';
const OG_IMAGE_HEIGHT = '512';

export default {
  name: 'IndexPage  ',
  components: { OperationResult, DecryptForm, EncryptForm },
  setup() {
    useMeta({
      title: PAGE_TITLE,
      meta: {
        description: { name: 'description', content: PAGE_DESCRIPTION },
        robots: { name: 'robots', content: 'index, follow' },
        ogType: { property: 'og:type', content: 'website' },
        ogTitle: { property: 'og:title', content: PAGE_TITLE },
        ogDescription: { property: 'og:description', content: PAGE_DESCRIPTION },
        ogUrl: { property: 'og:url', content: SITE_URL },
        ogImage: { property: 'og:image', content: OG_IMAGE },
        ogImageWidth: { property: 'og:image:width', content: OG_IMAGE_WIDTH },
        ogImageHeight: { property: 'og:image:height', content: OG_IMAGE_HEIGHT },
        ogImageAlt: { property: 'og:image:alt', content: 'Text Encrypter logo' },
        ogSiteName: { property: 'og:site_name', content: 'Text Encrypter' },
        twitterCard: { name: 'twitter:card', content: 'summary' },
        twitterTitle: { name: 'twitter:title', content: PAGE_TITLE },
        twitterDescription: { name: 'twitter:description', content: PAGE_DESCRIPTION },
        twitterImage: { name: 'twitter:image', content: OG_IMAGE },
        themeColor: { name: 'theme-color', content: '#1d1d1d' },
      },
      link: {
        canonical: { rel: 'canonical', href: SITE_URL },
        manifest: { rel: 'manifest', href: `${SITE_URL}/icons/site.webmanifest` },
        iconSvg: { rel: 'icon', type: 'image/svg+xml', href: `${SITE_URL}/icons/favicon.svg` },
        appleTouchIcon: { rel: 'apple-touch-icon', sizes: '180x180', href: `${SITE_URL}/icons/apple-touch-icon.png` },
      },
      htmlAttr: {
        lang: 'en',
      },
      script: {
        ldJson: {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Text Encrypter',
            url: SITE_URL,
            image: OG_IMAGE,
            applicationCategory: 'SecurityApplication',
            operatingSystem: 'Any',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
            description: PAGE_DESCRIPTION,
          }),
        },
      },
    });
  },
  data() {
    return {
      option: 0,
      resultContent: 'No result yet.',
    };
  },
  methods: {
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
      } else {
        // eslint-disable-next-line
        return `text-encrypter-DECRYPTED-${new Date().getTime()}.txt`;
      }
    },
  },
  watch: {
    option() {
      this.resultContent = 'No result yet.';
    }
  }

};
</script>
