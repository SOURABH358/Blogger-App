const app = require('./app')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

dotenv.config({path:'./config.env'})
const port = process.env.PORT||6000;
const db = process.env.DB.replace('<PASSWORD>',process.env.DB_PASSWORD)

mongoose.connect(db).then(()=>{
    console.log('Mongodb connection was successful')
})

app.listen(port, ()=>{
    console.log(`server is listening at port: ${port}`)
})