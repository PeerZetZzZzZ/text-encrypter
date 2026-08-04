import { defineSsrMiddleware } from '#q-app'

export default defineSsrMiddleware(({ app, resolve, render, serve }) => {
  app.get(resolve.urlPath('{*path}'), async (req, res) => {
    res.setHeader('Content-Type', 'text/html')

    try {
      const renderedHtml = await render({ req, res })
      res.send(renderedHtml)
    } catch (err) {
      if (err?.routeNotFound) {
        res.status(404).send('404 | Page Not Found')
        return
      }

      if (err?.redirectUrl) {
        res.redirect(err.redirectHttpStatusCode, err.redirectUrl)
        return
      }

      if (import.meta.env.QUASAR_DEV) {
        const { errorHeaders, errorHtml } = serve.devError({ err, req })
        res.set(errorHeaders).status(500).send(errorHtml)
        return
      }

      if (import.meta.env.QUASAR_DEBUG) {
        console.error(
          err instanceof Error ? err.stack : (err ?? 'Unknown error')
        )
      }

      res.status(500).send('500 | Internal Server Error')
    }
  })
})
