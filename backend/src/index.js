const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');

//inicia o servidor 
const app = express();

//configuração do banco de dados utilizando o mongo com o pacote mongoose
mongoose.connect('mongodb+srv://usermongo:usermongo@cluster0-amq7j.mongodb.net/omnistack10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//aplica para todas as rotas da aplicação o formato do corpo da requisição em json
app.use(express.json());

//utiliza as rotas definidas pelo arquivo routes.js
app.use(routes);

//define a porta onde a aplicação ira executar e rodar o serviço
app.listen(3339);