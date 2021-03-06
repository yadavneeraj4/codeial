const express=require('express');
const { resourceLimits } = require('worker_threads');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const db=require('./config/mongoose');


app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));
//use express router
app.use('/',require('./routes'));

//setup the view engine
 app.set('view engine', 'ejs');
 app.set('views', './views');

app.listen(port,err=>{
    if(err){
console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
})