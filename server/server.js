var express = require('express')
var mongoose = require('mongoose')

require('dotenv').config()

mongoose.connect(process.env.DB_URL, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
const db = mongoose.connection

const Token = mongoose.model('token', mongoose.Schema({
    token_id: Number,
    nickname: String,
    address: String,
}), 'token')

const Address = mongoose.model('address', mongoose.Schema({
    address: String,
    nickname: String,
}), 'address')

var app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})

app.get('/api/token/:tokenId', async (req, res) => {
    if (req.params.tokenId != null) {
        const user = await Token.findOne({ token_id: req.params.tokenId })
        res.json({
            name: user.nickname,
            description: user.address
        })
    } else {
        res.status(400)
    }
})

app.get('/api/contract', (req, res) => {
    const contract = {
        description: "Tokenize yourself!",
        name: "Hello Token",
        external_link: "http://",
        image: "https://example.com/image.png"
    }
    res.json(contract)
})

app.post('/api/token/', async (req, res) => {
    let nick = req.body.nickname
    let token = req.body.token_id
    let address = req.body.address
    if (token != null) {
        const exists = await Token.findOne({ token_id: token })
        if (exists == null) {
            if (nick != null && token != null) {
                const newToken = await Token.create({token_id: token, nickname: nick, address: address})
                if (newToken != null) {
                    res.status(200)
                    res.end()
                }
            }
        }
    }
    res.status(400)
    res.end()
})

app.post('/api/address/:address', async (req, res) => {
    if (req.params.address != null) {
        let address = req.params.address
        let nickname = req.body.nickname
        if (nickname != null) {
            const exists = await Address.findOne({ address: address })
            if (exists == null) {
                const newAddress = await Address.create({address: address, nickname: nickname })
                if (newAddress != null) {
                    res.status(200)
                    res.end()
                }
            }
        }
    }
    res.status(400)
    res.end()
})

app.get('/api/address/:address', async (req, res) => {
    if (req.params.address != null) {
        let address = req.params.address
        const exists = await Address.findOne({ address: address })
        if (exists != null) {
            res.json({
                nickname: exists.nickname
            })
            res.end()
        } else {
            res.json({
                nickname: ''
            })
            res.end()
        }
    }
    res.status(400)
    res.end()
})

app.listen(8888, () => { })