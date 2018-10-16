const createError = require('http-errors')
const express = require('express')
const cookieParser = require('cookie-parser')
const apiErrorHandler = require('api-error-handler')
const logger = require('morgan')
const http = require('http')
const config = require('../config')

const app = express()
const { port = 6000, buildPath, indexPath } = config

app.set('port', port)
app.disable('x-powered-by')

app.use(logger('combined'))

app.use(express.static(buildPath))

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.get('*', (req, res) => {
  res.sendFile(indexPath)
})

app.use((req, res, next) => {
  next(createError(404))
})

app.use(apiErrorHandler())

const server = http.createServer(app)

server.listen(port, () => {
  const { address } = server.address()
  console.log(`Running app on ${address}:${port}.`) // eslint-disable-line
})
