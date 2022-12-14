const express = require('express')
const path = require('path')
const Approuter = require('./routers/appRouter')
const CookieParser = require('cookie-parser');
const app = express();


app.use(express.json())
app.use(express.static(path.join(__dirname,'./public')))
app.use('/users', express.static('users'))
app.use('/uploads', express.static('uploads'))
app.set('view engine','pug')
app.set('views',path.join(__dirname, './views'))

app.use(CookieParser())
app.use('/',Approuter)

module.exports = app;