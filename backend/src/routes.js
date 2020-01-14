//exporta o modulo de routas do express
const { Router } = require('express');
const DevController = require('./controllers/DevController');
const SearchController = require('./controllers/SearchController');

//atribui o router a constante para possibilitar a utilização dos métodos
const routes = Router();

//Define as rotas 
routes.get('/devs', DevController.index);
routes.post('/devs', DevController.store);

routes.get('/search', SearchController.index);


//exporta as rotas para que possa ser utilizada por outros arquivos
module.exports = routes;