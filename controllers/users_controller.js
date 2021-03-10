const { Cookie } = require("express-session");
const { userInfo } = require("os");
const User=require('../models/user');

module.exports.profile=function(req,res){
return res.render('profile',{
    title:"Users-profile"})
}

//render the signup page
module.exports.signup= function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signup',{
        title:"Users-signup"
    })
}
//render the signin page
module.exports.signin=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('signin',{
        title:"Users-signin"
    });
}
//get the signup data
module.exports.create=(req,res)=>{
    if(req.body.password!= req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email:req.body.email},function(err,user){
        if(err){console.log('error in finding user in signing up');return}
        if(!user){
            User.create(req.body,function(err,user){
                if(err){console.log('error in finding user in signing up');return}
                return res.redirect('/users/signin');
            })
        }else{
            return res.redirect('back');
        }
    })
}
//signin and create a session for user
module.exports.createSession=function(req,res){
    return res.redirect('/');
}

module.exports.destroySession = function(req,res){
    req.logout();
    
    return res.redirect('/');
}