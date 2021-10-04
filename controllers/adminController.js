const Cats = require('../models/catsModel')
const jwtHelper = require('../ultils/jwtHelper')


class adminController {
    // authen middleware
    authen(req, res, next) {
        try {
            var token = req.cookies.token
            var authen = jwtHelper.authenToken(token)
            if(authen) {
                next()
            }
        }catch (err) {
            res.redirect('/login')
        }
    }



    // [GET]  host/admin
    index(req, res, next) {
        let query = Cats.find({})

        if(req.query.hasOwnProperty('_sort')) {
            query = query.sort({
                [req.query.column]: req.query.type
            })
        }

        query.lean()
            .then(function(cats) {
                res.render('admin/index', {cats: cats})
            })
            .catch(function(err) {
                next(err)
            })
    }

    // [GET] host/admin/create
    showFormCreate(req, res, next) {
        res.render('admin/create')
    }


    // [POST] host/admin/create
    create(req, res, next) {
        var birthday = req.body.birthday.split('-').reverse().join('-')
        const cat = req.body
        cat.birthday = birthday

        Cats.create(cat)
            .then(function() {
                res.redirect('/admin')
            })
            .catch(function(err) {
                next(err)
            })
    }

    // [POST] host/admin/edit/:id
    edit(req, res, next) {
        var id = req.params.id
        Cats.findOne({_id: id}).lean()
            .then(function(cat) {
                res.render('admin/edit', {cat: cat})
            })
            .catch(function(err){
                next(err)
            })
    }


    // [PUT] host/admin/edit/:id
    update(req, res, next) {
        var birthday = req.body.birthday.split('-').reverse().join('-')
        const cat = req.body
        cat.birthday = birthday

        Cats.updateOne({_id: req.params.id}, cat)
            .then(function() {
                res.redirect('/admin')
            })
            .catch(function(err) {
                next(err)
            })
    }


    // [DELETE] host/admin/:id
    delete(req, res, next) {
        Cats.deleteOne({_id: req.params.id})
            .then(function() {
                res.redirect('back')
            })
            .catch(function(err) {
                next(err)
            })
    }
}


module.exports = new adminController