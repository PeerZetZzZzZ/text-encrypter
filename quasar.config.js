import { defineConfig } from '#q-app'

export default defineConfig(() => {
  return {
    boot: [],

    css: [
      'app.scss'
    ],

    extras: [
      'roboto-font',
      'material-icons',
    ],

    build: {
      vueOptionsAPI: true,

      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node22'
      },

      vueRouterMode: 'history',
    },

    devServer: {
      open: true
    },

    framework: {
      config: {},
      plugins: ['Meta']
    },

    animations: [],

    ssr: {
      pwa: false,
      prodPort: 3000,
      middlewares: [
        'render'
      ]
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false,
    },

    cordova: {},

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',
      packager: {},
      builder: {
        appId: 'text-encrypter2'
      }
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ],
    }
  }
})
