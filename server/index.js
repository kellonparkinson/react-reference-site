// Imports
const express = require('express')
const cors = require('cors')
const server = express()
const db = require('./utils/database')
const { User, Product, Cart } = require('./utils/models')
const seed = require('./utils/seed')

// Middleware
server.use(express.json())
server.use(cors())

// Associations
User.hasMany(Cart)
Cart.belongsTo(User)

Product.hasMany(Cart)
Cart.belongsTo(Product)

// Endpoints
server.post('/api/addUser', async (req, res) => {
    const {username, password} = req.body

    try {
        await User.create({username, password})
        res.status(200).send('User created')
    } catch {
        res.status(401).send('Could not create user')
    }
})

server.get('/api/user/:id', async (req, res) => {
    const {id} = req.params

    try {
        let info = await User.findOne({where: {id: id}})
        res.status(200).send(info)
    } catch {
        res.status(400).send("Couldn't complete request")
    }
})

server.get('/cart/:userId', async (req, res) => {
    const {userId} = req.params

    try {
        let cart = await Cart.findAll({
            where: {userId},
            include: [{
                model: User,
                attributes: ['username'],
                required: true
            }, Product]
        })
        res.status(200).send(cart)
    } catch {
        res.status(400).send('Error with query')
    }
})

db
    .sync()
    // .sync({force: true})
    // .then(() => seed())
// Listen
const PORT = 4000
server.listen(PORT, console.log(`Listening on ${PORT}`))