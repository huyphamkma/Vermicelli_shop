const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Accounts = new Schema({
    username: {type: String, maxlength: 30},
    password: {type: String, maxlength: 20},
})


module.exports = mongoose.model('accounts', Accounts)