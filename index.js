const express=require('express');
const { resourceLimits } = require('worker_threads');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressEjsLayouts = require('express-ejs-layouts');
const db=require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy'); 
const { Mongoose } = require('mongoose');
const MongoStore = require('connect-mongo').default;
const sassMiddleware = require('node-sass-middleware');

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: 'extended',
    prefix: '/css'
}))
app.use(express.urlencoded({extended:true}));

app.use(cookieParser());

app.use(express.static('./assets'));

 app.use(expressEjsLayouts);
// // extract style and scripts from sub pages into the layout
 app.set('layout extractStyles', true);
 app.set('layout extractScripts', true);


//setup the view engine
 app.set('view engine', 'ejs');
 app.set('views', './views');

 // mongo store is used to tore the session cookie in db
 app.use(session({
     name: 'codeial',
     //todo change the secret before deployment in production mode
     secret: 'blahsomething',
     saveUninitialized:false, //if identity is not established dont save
     resave:false, //don't write same thing again and again from cookies
     cookie:{
         maxAge:(1000*60*100)
     },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/major_db', 
        mongooseConnection : db,
        autoRemove:'disabled'
},
     function(err){
         console.log(err || 'connect-mongodb setup ok');
     })
 }));

 app.use(passport.initialize());
 app.use(passport.session());

 app.use(passport.setAuthenticatedUser);

//use express router
app.use('/',require('./routes'));

app.listen(port,err=>{
    if(err){
console.log(`Error in running the server: ${err}`);
    }

    console.log(`server is running on port: ${port}`);
})