const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/ProductController');
const ProviderController = require('./controllers/ProviderController');
const UserController = require('./controllers/UserController');
const auth = require('./authentication');

routes.post('/provider',auth, ProviderController.store);
routes.get('/providers',auth, ProviderController.index);
routes.get('/provider/:id',auth, ProviderController.show);
routes.put('/provider/:id',auth, ProviderController.update);
routes.delete('/provider/:id',auth, ProviderController.destroy);

routes.get('/products',auth, ProductController.index);
routes.get('/product/:id',auth, ProductController.show);
routes.get('/product/barcode/:barcode',auth, ProductController.findByBarcode);
routes.get('/products/provider/:providerId',auth, ProductController.findByProviderId);
routes.post('/product',auth, ProductController.store);
routes.put('/product/:id',auth, ProductController.update);
routes.delete('/product/:id',auth, ProductController.destroy);

routes.get('/users',auth, UserController.index);
routes.post('/user',auth, UserController.store);
routes.get('/user/:id',auth, UserController.show);
routes.put('/user/:id',auth, UserController.update);
routes.delete('/user/:id',auth, UserController.destroy);
routes.post('/auth', UserController.auth);
routes.put('/changepw',auth, UserController.changePassword);

module.exports = routes;

