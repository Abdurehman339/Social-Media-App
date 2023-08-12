const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/socialmediaapp'

const ConnectToMongo = async ()=>{
    await mongoose.connect(url,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    console.log('connected Sucessfully')
    );
}

module.exports = ConnectToMongo