const fs = require('fs')
const path = require('path')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const BlogModel = require('../models/blogModels')

dotenv.config({path: './config.env'})
const db = process.env.DB.replace('<PASSWORD>',process.env.DB_PASSWORD);
const data = JSON.parse(fs.readFileSync(path.join(__dirname, 'data.json'),'utf-8'));

mongoose.connect(db).then(()=>{
    console.log('Mongodb connection is made successfully')
})

const importData = async ()=>{
    try{
        await BlogModel.create(data)
    }catch(err)
    {
        console.log(err)
    }
    process.exit();
}
const deleteData = async ()=>{
    try{
        await BlogModel.deleteMany();
    }catch(err)
    {
     console.log(err)   
    }
    process.exit();
}
if(process.argv[2] === '--import')
{
    importData();
}
else if(process.argv[2] === '--delete')
{
    deleteData();
}