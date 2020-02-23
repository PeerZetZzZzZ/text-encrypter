# Text Encrypter (text-encrypter)

Universal text data encryption/decryption tool using AES-256 (CBC) algorithm.
Live version: https://textencryter.com

![TextEncrypter](preview.png)

Features:
- .txt data file encryption
- optional SHA-256 checksum of password
- save result as JSON (.txt file)
- .txt data file decryption

Encryption specification:
- AES-256 CBC
- 16 bytes IV vector random generated from ASCII characters
- PKCS7 encryption payload padding


Tool works offline.

## Install the dependencies
```bash
npm install
```

### Start the app in development mode (hot-code reloading, error reporting, etc.)
```bash
quasar dev
```

### Lint the files
```bash
npm run lint
```

### Build the app for production
```bash
quasar build
```

### Customize the configuration
See [Configuring quasar.conf.js](https://quasar.dev/quasar-cli/quasar-conf-js).
