const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const connection = require('./src/database/database');
const localIpV4Address = require("local-ipv4-address");
const routes = require('./src/routes');
const Product = require('./src/models/Product');
const Provider = require('./src/models/Provider');
const cors = require('cors');

connection
    .authenticate()
    .then(() => {
        console.log("Conexão feita com o banco de dados");
    })
    .catch((erro) => {
        console.log(erro);
    })

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(cors());
app.use(routes);

let server = app.listen(8000, localIpV4Address(), ()=>{
    console.log("Servidor rodando!");
    localIpV4Address().then((ip)=>{
        console.log(`Servidor rodando em: http://${ip}:8000`);
    })
}); 
