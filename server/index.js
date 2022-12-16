// Imports
const express = require('express')
const cors = require('cors')
const server = express()
const db = require('./utils/database')
const { User, Product, Cart } = require('./utils/models')

// Middleware
server.use(express.json())
server.use(cors())

// Associations
User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)

// Endpoints


db.sync()
// Listen
const PORT = 4000
server.listen(PORT, console.log(`Listening on ${PORT}`))