const siteRoute = require('./site')
const shopRoute = require('./shop')
const adminRoute = require('./admin')

function route(app) {
    
    app.use('/admin', adminRoute)
    app.use('/shop', shopRoute)
    app.use('/', siteRoute)
    
}

module.exports = route