const express = require('express')
const db = require('../models')
const router = express.Router()
const cryptojs = require('crypto-js')
require('dotenv').config()
const bcrypt = require('bcrypt')
const axios = require("axios")
router.get('/new', (req, res)=>{
    res.render('organizers/new.ejs')
})

router.post('/', async (req, res)=>{
    const [newOrganizer, created] = await db.organizer.findOrCreate({where:{username: req.body.username}})
    if(!created){
        console.log('user already exists')
        res.render('organizers/login.ejs', {exists_error: 'Looks like you already have an account! Try logging in :)', name_error:"",pass_error:""})
    } else {
        const hashedPassword = bcrypt.hashSync(req.body.password, 10)
        newOrganizer.password = hashedPassword
        await newOrganizer.save()
        const encryptedUserId = cryptojs.AES.encrypt(newOrganizer.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        axios.get(`https://avatars.dicebear.com/api/adventurer/baby.svg`).then
        res.render('organizers/login',{name_error:"", exists_error:"", pass_error:""})
    }
})

router.get('/login', (req, res)=>{
    res.render('organizers/login.ejs', {name_error:"", exists_error:"", pass_error:""})
})

router.post('/login', async (req, res)=>{
    const user = await db.organizer.findOne({where: {username: req.body.username}})
    if(!user){
        console.log('user not found')
        res.render('organizers/login', {name_error: 'Invalid username', exists_error:"",pass_error:""})
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('password incorrect')
        res.render('organizers/login', { pass_error: "Incorrect password",name_error:"",exists_error:"" })
    } else {
        console.log('logging in the user!!!')
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET)
        const encryptedUserIdString = encryptedUserId.toString()
        res.cookie('userId', encryptedUserIdString)
        
        res.redirect('/organizers/profile')
    }
})

router.get('/logout', (req, res)=>{
    console.log('logging out')
    res.clearCookie('userId')
    res.redirect('/')
})

router.get('/profile', async (req, res)=>{
    const userSeshs = await db.session.findAll({where:{organizerId:res.locals.user.id}})
    let picLink;
    axios.get(`https://ui-avatars.com/api/?length=1&name=${res.locals.user.username}`).then(function (response) {
       picLink= response.config.url;
       res.render('organizers/profile', {userSeshs:userSeshs ,picLink: picLink} )
        });
})

router.post("/new-session",async (req, res)=>{
    const [newSession, created] = await db.session.findOrCreate({where:{seshName: req.body.seshName}})
    if(!created){
        console.log("didn't happen")
                    res.redirect("back")
                    
    } else {
        const user = await db.organizer.findOne({where:{username:res.locals.user.username}})
        await user.addSession(newSession)
        console.log(" happen")

            res.redirect("back")

    }
   
})
module.exports = router
