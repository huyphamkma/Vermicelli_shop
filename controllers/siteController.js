const Accounts = require('../models/accountModel')
const jwtHelper = require('../ultils/jwtHelper')
const nodemailer = require("nodemailer")


class siteController {
    // [GET]    /
    index(req, res, next) {
        res.render('home')
    }


    // [GET] /host/login
    login(req, res, next) {
        res.render('admin/login')
    }

    // [POST] /host/login
    authen(req, res, next) {
        Accounts.findOne({
            username: req.body.username,
            password: req.body.password
        })
            .then(function (user) {
                var token = jwtHelper.generateToken(user._id)
                res.cookie('token', token)
                res.redirect('/admin')
            })
    }


    // [GET] /host/contact
    contact(req, res, next) {
        res.render('contact')
    }


    // [POST] /host/contact
    // sendEmail(req, res, next) {
    //     var guest = {
    //         name: req.body.name,
    //         email: req.body.email,
    //         subject: req.body.subject,
    //         message: req.body.message
    //     }

    //     let transporter = nodemailer.createTransport({
    //         host: 'smtp.gmail.com',
    //         port: 587,
    //         secure: false,
    //         auth: {
    //             user: 'huylampard3@gmail.com',
    //             pass: '11221221'
    //         }
    //     })
    //     let message = {
    //         to: 'huylampard3@gmail.com',
    //         subject: guest.subject,
    //         html: `
    //         <h1>${guest.name}</h1>
    //         <h2>${guest.email}</h2>
    //         <p>${guest.message}</p>
            
    //         `

    //     };
    
    //     transporter.sendMail(message, (err, info) => {
    //         if (err) {
    //             console.log('Error occurred. ' + err.message);
    //             return process.exit(1);
    //         }
    //     })
    //     res.render('contact', {msg: 'Thank you! your message has been sent'})
    // }
}

module.exports = new siteController
