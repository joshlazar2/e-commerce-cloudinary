const mongoose = require('mongoose');
require('dotenv').config();
//                                          only need to change the db name

const uri = process.env.MONGODB_URI
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Established a connection to the database'))
    .catch(err => console.log('Something went wrong when connecting to the database ', err));