const express = require('express')
const cors = require('cors')

const server = express()

// Middleware
server.use(express.json())
server.use(cors())

//Endpoints


//Listen
const PORT = 4000
server.listen(PORT, console.log(`Listening on ${PORT}`))