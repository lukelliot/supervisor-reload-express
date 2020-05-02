const express = require('express')
const path = require('path')
const http = require('http')
const reload = require('reload')
const logger = require('morgan')

const PUBLIC_DIR = path.join(__dirname, 'public')
const SRC_DIR = path.join(__dirname, 'src')

const app = express()

app.set('port', process.env.PORT || 3000)

app.use(express.static(PUBLIC_DIR))
app.use(express.static(SRC_DIR))
app.use(logger('dev'))

const server = http.createServer(app)

reload(app, { verbose: true }).then((reloader) => {
  server.listen(app.get('port'), () => {
    console.log('Web server listening on port ' + app.get('port'))
  })
}).catch((err) => {
  console.error('Reload could not start, could not start app', err)
})
