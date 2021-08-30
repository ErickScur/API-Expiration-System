const express = require('express');
const routes = express.Router();
const ProductController = require('./controllers/ProductController');
const Product = require('./models/Product');
const ProviderController = require('./controllers/ProviderController');
const Provider = require('./models/Provider');

routes.post('/provider',ProviderController.store);
routes.get('/providers',ProviderController.index);
routes.get('/provider/:id',ProviderController.show);
routes.put('/provider/:id', ProviderController.update);
routes.delete('/provider/:id', ProviderController.destroy);

routes.get('/products', ProductController.index);
routes.get('/product/:id', ProductController.show);
routes.get('/product/barcode/:barcode', ProductController.findByBarcode);
routes.get('/products/provider/:providerId', ProductController.findByProviderId);
routes.post('/product', ProductController.store);
routes.put('/product/:id', ProductController.update);

module.exports = routes;
