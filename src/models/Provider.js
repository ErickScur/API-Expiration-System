const Sequelize = require('sequelize');
const connection = require('../database/database');

const Provider = connection.define('provider',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

Provider.sync({force:false}).then(()=>{});
module.exports = Provider;