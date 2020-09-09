import path from 'path'
import express from 'express'
import SocketServer from './public/js/socketServer.js'

const app = express()
const port = 3000
const socketPort = 3333

app.use('/public', express.static('public'))
app.use('/modules', express.static('node_modules'))

app.get('/', (req, res) => {
    res.sendFile(path.resolve() + '/templates/index.html')
})

SocketServer(app, socketPort)
