const express = require('express')
const path = require('path')
const fs = require('fs')

const PORT = 3000

const app = express()

app.use(express.static(path.join(__dirname, 'stylesheets')));

app.get('/', (request, response) => {
  console.log('Incoming Request to Route: ', request.path)

  fs.readFile("first_website_lol.html", function (err, data) {
    if (err) {
      response.writeHead(404)
      return response.end()
    }

    response.writeHead(200, { 'Content-Type': 'text/html' })
    response.write(data)
    response.end()
  });
})


app.listen(PORT, (error) => {
  if (error) return console.log('oh fuck we fucked up', error)
  console.log(`Starting local server. Listening on port: ${PORT}...`)
})
