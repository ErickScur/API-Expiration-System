const Sequelize = require('sequelize');
const connection = require('../database/database');

const User = connection.define('user',{
    login: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    admin: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
});

User.sync({force:false}).then(()=>{});
module.exports = User;