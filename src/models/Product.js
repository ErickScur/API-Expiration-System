const Sequelize = require('sequelize');
const connection = require('../database/database');
const Provider = require('./Provider');

const Product = connection.define('product',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    expirationDate:{
        type: Sequelize.DATE,
        allowNull: false
    },
    barcode:{
        type: Sequelize.STRING,
        allowNull: true
    },
    providerName:{
        type: Sequelize.STRING,
        allowNull: false
    }
}); 

Provider.hasMany(Product);
Product.belongsTo(Provider);

Product.sync({force:false}).then(()=>{});
module.exports = Product;