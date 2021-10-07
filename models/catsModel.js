const mongoose = require('mongoose')
var slug = require('mongoose-slug-generator')
const Schema = mongoose.Schema
mongoose.plugin(slug)


const Cats = new Schema({
    name: {type: String, maxlength:100},
    breed: {type: String, maxlength:50},
    birthday: {type: String, maxlength:20},
    gender: {type: String, maxlength:10},
    intro: {type: String},
    fb: {type: String, maxlength:255},
    slug: {type: String, slug: 'name', unique: true},
    img1: {type: String, maxlength: 255},
    img2: {type: String, maxlength: 255},
    img3: {type: String, maxlength: 255},
})

module.exports = mongoose.model('cats', Cats)