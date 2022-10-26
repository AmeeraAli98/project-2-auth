const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const cookieParser = require('cookie-parser')
const db = require('./models')
const fileUpload = require("express-fileupload")
const cryptoJS = require('crypto-js')
require('dotenv').config()

// MIDDLEWARE
app.set('view engine', 'ejs')
app.use(ejsLayouts)
app.use(cookieParser())
app.use(express.urlencoded({extended: false}))
app.use(fileUpload());

// AUTHENTICATION MIDDLEWARE
app.use(async (req, res, next)=>{
    if(req.cookies.userId) {
        const decryptedId = cryptoJS.AES.decrypt(req.cookies.userId, process.env.SECRET)
        const decryptedIdString = decryptedId.toString(cryptoJS.enc.Utf8)
        const user = await db.organizer.findByPk(decryptedIdString)
        res.locals.user = user
    } else res.locals.user= null
    next()
})

// CONTROLLERS
app.use('/organizers', require('./controllers/organizers'))
app.use('/submissions', require('./controllers/submissions'))
app.use("/css",express.static("css"))

// ROUTES

app.get('/', (req, res)=>{
    res.render('home')
})
app.get('/submit', (req, res)=>{
    res.render('submit')
})
   
app.listen(8000, ()=>{
    console.log('Project 2 Express Authentication')
})