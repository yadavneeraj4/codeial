const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost/major_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error on connecting to db'));

db.once('open',()=>{
    console.log('successfully connected to database');
})