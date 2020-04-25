const express = require('express')
const path = require('path')
const http = require('http')
const fs = require('fs')
const reload = require('reload')

const PORT = 3000

const app = express()

app.set('port', process.env.PORT || PORT)

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (request, response) => {
  console.log('Incoming Request to route: ', request.path)

  fs.readFile("public/first_website_lol.html", function (err, data) {
    if (err) {
      response.writeHead(404)
      return response.end()
    }

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(data)
    response.end()
  })
})

const server = http.createServer(app)

reload(app).then(function (_) {
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})
