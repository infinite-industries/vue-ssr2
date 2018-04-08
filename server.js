const fs = require('fs')
const path = require('path')
const express = require('express')
const favicon = require('serve-favicon')

const app = express();

const bundle = require('./dist/server.bundle.js');

const renderer = require('vue-server-renderer').createRenderer({
  template: fs.readFileSync('./public/index.html', 'utf-8')
});

// for serving client.js
app.use('/dist', express.static(path.join(__dirname, './dist')));

// to placate annoying favicon.ico requests
app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

app.get('*', (req, res) => {

  bundle.default({url: req.url}).then((app) => {

    // context to use as data source in template (e.g. index.html)
    const context = {
      title: 'Vue-SSR example',
      meta: '<meta description="vuejs server side render">'
    }

    renderer.renderToString(app, context, function (err, html) {
      if (err) {
        if (err.code === 404) {
          res.status(404).end('Page not found')
        } else {
          res.status(500).end('Internal Server Error')
        }
      } else {
        res.end(html)
      }
    })
  }, (err) => {
    console.log(err)
  })
})

const appPort = process.env.PORT || '7777';

var server = app.listen(appPort, () => {
    console.log("Serving on port %d", appPort);
});
