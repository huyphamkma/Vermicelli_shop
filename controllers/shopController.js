const Cats = require('../models/catsModel')


var breeds  // mang chua cac giong meo

class shopController {
    // [GET]    /shop
    index(req, res, next) {
        Cats.find({}).lean()
            .then(function (cats) {
                breeds = cats.map(function (cat) {
                    return cat.breed
                })
                breeds = Array.from(new Set(breeds))    // CHỉ lấy những phần tử unique
                res.redirect('/shop/1')
            })
            .catch(function (err) {
                next(err)
            })

    }

    // [GET] /shop/categories/:breed
    filter(req, res, next) {
        let perPage = 8 // number of cat show on 1 page
        let page = req.params.page || 1

        console.log(req.params)
        Cats.find({ breed: req.params.breed }).lean()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, cats) => {
                Cats.countDocuments({ breed: req.params.breed }, function (err, count) {
                    if (err) return next(err)
                    res.render('shop/shop', {
                        cats,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        breeds: breeds,
                        path: `/categories/${req.params.breed}`,
                    })
                })
            })

    }


    // [GET] /shop/categories/:breed/:page
    paginationFilter(req, res, next) {
        let perPage = 8 // number of cat show on 1 page
        let page = req.params.page || 1


        Cats.find({ breed: req.params.breed }).lean()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, cats) => {
                Cats.countDocuments({ breed: req.params.breed }, function (err, count) {
                    if (err) return next(err)
                    res.render('shop/shop', {
                        cats,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        breeds: breeds,
                        path: `/categories/${req.params.breed}`,
                    })
                })
            })
    }



    // [GET]    /shop/detail/:slug
    detail(req, res, next) {
        Cats.findOne({ slug: req.params.slug }).lean()
            .then(function (cat) {
                res.render('shop/detail', { cat })
            })
            .catch(function (err) {
                next(err)
            })
    }



    // [GET]    /shop/:page
    pagination(req, res, next) {
        let perPage = 8 // number of cat show on 1 page
        let page = req.params.page || 1
        var catQuery = Cats.find({})

        if (breeds === undefined) {
            Cats.find({}).lean()
                .then(function (cats) {
                    breeds = cats.map(function (cat) {
                        return cat.breed
                    })
                    breeds = Array.from(new Set(breeds))
                    res.redirect('/shop/1')
                })
                .catch(function (err) {
                    next(err)
                })
        }

        catQuery.lean()
            .skip((perPage * page) - perPage)
            .limit(perPage)
            .exec((err, cats) => {
                Cats.countDocuments({}, function (err, count) {
                    if (err) return next(err)
                    res.render('shop/shop', {
                        cats,
                        current: page,
                        pages: Math.ceil(count / perPage),
                        breeds: breeds,
                        path: ''
                    })
                })
            })

    }
}


module.exports = new shopController
