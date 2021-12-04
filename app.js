const express = require('express');
const app = express();
const configRoutes = require('./routes');
const static = express.static(__dirname + '/public');
const exphbs = require('express-handlebars');
const session = require('express-session');
app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

app.use(
    session({
      name: 'AuthCookie',
      secret: "some secret string!",
      saveUninitialized: true,
      resave: false,
    })
  );
  app.use(async(req,res,next)=>{
    user_status= "(Non-Authenticated User)"
  
    if(req.session.user){
      user_status="(Authenticated User)"
    }
    
    console.log(`[${new Date().toUTCString()}] : ${req.method} ${req.originalUrl} ${user_status}`);
    next()
  })
  app.get('/users/login', (req, res, next) => {
 
    if (req.session.user) {
      //req.method = 'GET';
      return res.redirect('/users/private');
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
     next()
    }
  });
  app.use('/users/private', (req,res,next)=>{
    if(!req.session.user){
       return res.redirect('/users/login');
    }
    else{
        next();
    }
});
app.use('/users/profile', (req,res,next)=>{
  if(!req.session.user){
     return res.redirect('/users/login');
  }
  else{
      next();
  }
});
app.get('/users/signup', (req, res, next) => {
 
  if (req.session.user) {
    //req.method = 'GET';
    return res.redirect('/users/private');
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
   next()
  }
});

app.get('/users/logout',(req,res,next)=>{
  if(req.session.user){
     req.session.destroy()}
  else{
    return res.redirect('/users/login');
  }
  next()

});
  
app.get('/users/seeprofile', (req, res, next) => {
 
  if (req.session.user) {
    //req.method = 'GET';
    next()
    
  } else {
    //here I',m just manually setting the req.method to post since it's usually coming from a form
    return res.redirect('/users/login'); }});
  app.get('/users/profiledetail', (req, res, next) => {
 
    if (req.session.user) {
      //req.method = 'GET';
      next()
      
    } else {
      //here I',m just manually setting the req.method to post since it's usually coming from a form
      return res.redirect('/users/login');
    }});
    app.get('/users/updateprofile', (req, res, next) => {
 
      if (req.session.user) {
        //req.method = 'GET';
        next()
        
      } else {
        //here I',m just manually setting the req.method to post since it's usually coming from a form
        return res.redirect('/users/login');
      }});
          
configRoutes(app);

app.listen(3000, () => {
  console.log("We've now got a server!");
  console.log('Your routes will be running on http://localhost:3000');
});