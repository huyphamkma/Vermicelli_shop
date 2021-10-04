const path = require('path')
const express = require('express')
const handlebar = require('express-handlebars')
const methodOverride = require('method-override')
const db = require('./models/index')
const sortMiddleware = require('./middlewares/sortMiddleware')
const handlebarHelpers = require('./ultils/handlebarHelpers')
const cookieParser = require('cookie-parser')


var app = express()
var port = process.env.PORT || 3000


// middleware
app.use(methodOverride('_method'))
app.use(sortMiddleware)



db.connect()


const route = require('./routes/index')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())




app.engine('.hbs', handlebar({
    extname: '.hbs', helpers: {
        sum: handlebarHelpers.sum,
        sortable: handlebarHelpers.sortable,
        pagination: handlebarHelpers.pagination,
    }
}))



app.set('view engine', '.hbs')


app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')));




route(app)




app.listen(port, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
  });