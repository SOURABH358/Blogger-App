const express = require('express')
const Approuter = require('./routers/appRouter')
const app = express();

app.use(express.json())
app.use('/blogger',Approuter)

module.exports = app;