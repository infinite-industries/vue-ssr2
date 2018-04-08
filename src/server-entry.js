import { createApp } from './app';

// This exported function will be called by `bundleRenderer`.
export default context => {

  return new Promise((resolve, reject) => {
    const { app, router } = createApp()

    // set server-side router's location
    router.push(context.url)

    router.onReady(() => {
      const matchedComponents = router.getMatchedComponents()
      // if no matched routes, reject with 404
      if (!matchedComponents.length) {
        return reject({ code: 404 })
      }
      // the Promise should resolve to the app instance so it can be rendered
      resolve(app)
    }, reject)
  })
}
