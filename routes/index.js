const mainRoutes = require('./users');
const routes = require('./shopkeeper');
const constructorMethod = (app) => {
  app.use('/', routes);  
  app.use('/users',mainRoutes)
    /*app.get("/", (req,res) => {
        let title = "People Finder"
        res.render("posts/searching", { title } )

    })*/

  app.use('*', (req, res) => {
    res.redirect('/');
  });
};
    // app.use('*', (req,res)=>{
    //     res.render('');
    //     return;
    // });
    // res.send("Invalid");

module.exports = constructorMethod;