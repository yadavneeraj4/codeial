module.exports.home=function(req,res){
    console.log(req.cookies);
return res.render('home',{
    title:"Home"
})
}
module.exports.image=function(req,res){
    return res.end('all images');
}