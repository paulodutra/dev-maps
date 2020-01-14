const mongoose = require('mongoose');
const PointSchema = require('./utils/PointSchema');

//define o schema da collection que sera armazenada no mongo
const DevSchema = new mongoose.Schema({
   name: String,
   github_username: String,
   bio: String,
   avatar_url: String,
   techs: [String],
   location: {
       type: PointSchema,
       index: '2dsphere' //para trabalhar com geolocalização o indice ajuda a encontrar isso no banco
   }
});
/**
 * Primeiro parametro o nome do model como sera armazenado no banco de dados
 *  
 * */
module.exports =  mongoose.model('Dev', DevSchema);