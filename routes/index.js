
const product = require('./products');
const shop = require('./shopkeeper');
const users = require('./users');

const constructorMethod = (app) => {

  app.use('/shopId', product);
  app.use('/shop', shop);
  app.use('/users', users);
 app.use('/', shop); 
  app.use("*", (req, res) => {
   res.redirect('/');
    
  });
  app.use('*', (req, res) => {
    res.redirect('/');
  });
}
  






module.exports = constructorMethod;