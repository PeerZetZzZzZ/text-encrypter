/**
 * https://v2.quasar.dev/quasar-cli-vite/developing-ssr/ssr-webserver
 *
 * Runs in Node.js context.
 */

import express from 'express'
import compression from 'compression'
import {
  defineSsrClose,
  defineSsrCreate,
  defineSsrInjectDevMiddleware,
  defineSsrListen,
  defineSsrRenderPreloadTag,
  defineSsrServeStaticContent
} from '#q-app'

export const create = defineSsrCreate(async () => {
  const app = express()

  app.disable('x-powered-by')

  if (import.meta.env.QUASAR_PROD) {
    app.use(compression())
  }

  return app
})

export const injectDevMiddleware = defineSsrInjectDevMiddleware(
  ({ app }) =>
    middleware => {
      app.use(middleware)
    }
)

export const listen = defineSsrListen(async ({ app, devHttpsOptions, port }) => {
  if (import.meta.env.QUASAR_DEV && devHttpsOptions) {
    const https = await import('node:https')
    const server = https.createServer(devHttpsOptions, app)
    return server.listen(port)
  }

  const http = await import('node:http')
  const server = http.createServer(app)
  return server.listen(port, () => {
    if (import.meta.env.QUASAR_PROD) {
      console.log(`Server listening at port ${port}`)
    }
  })
})

export const close = defineSsrClose(({ listenResult }) => listenResult.close())

const maxAge = import.meta.env.QUASAR_DEV ? 0 : 1000 * 60 * 60 * 24 * 30

export const serveStaticContent = defineSsrServeStaticContent(
  ({ app, resolve }) =>
    ({ urlPath, pathToServe, opts = {} }) => {
      const serveFn = express.static(resolve.public(pathToServe), {
        maxAge,
        ...opts
      })
      app.use(resolve.urlPath(urlPath), serveFn)
    }
)

const jsRE = /\.js$/
const cssRE = /\.css$/
const woffRE = /\.woff$/
const woff2RE = /\.woff2$/
const gifRE = /\.gif$/
const jpgRE = /\.jpe?g$/
const pngRE = /\.png$/

export const renderPreloadTag = defineSsrRenderPreloadTag((file) => {
  if (jsRE.test(file)) {
    return `<link rel="modulepreload" href="${file}" crossorigin>`
  }

  if (cssRE.test(file)) {
    return `<link rel="stylesheet" href="${file}" crossorigin>`
  }

  if (woffRE.test(file)) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`
  }

  if (woff2RE.test(file)) {
    return `<link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`
  }

  if (gifRE.test(file)) {
    return `<link rel="preload" href="${file}" as="image" type="image/gif" crossorigin>`
  }

  if (jpgRE.test(file)) {
    return `<link rel="preload" href="${file}" as="image" type="image/jpeg" crossorigin>`
  }

  if (pngRE.test(file)) {
    return `<link rel="preload" href="${file}" as="image" type="image/png" crossorigin>`
  }

  return ''
})
