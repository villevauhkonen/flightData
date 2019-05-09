import express from 'express'
import cors from 'cors'
import router from '../src/router'

const server = express()
const port = 5000

server.use(cors())

server.use(router)

server.listen(port, () => {
  console.log('server running @ localhost:' + port)
})