const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
//async: requisição assincrona

module.exports = {

    async index(request, response){
        const devs = await Dev.find();

        return response.json(devs);
    },

    async store(request, response){
        //destructing operator no body da req
        const { github_username, techs, latitude, longitude } =  request.body;
        let dev = await Dev.findOne( { github_username });
        
        if(!dev){
            //faz a requisição para api 
            const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);
            //name = login no destructing significa que se o name não tiver valor ou existir ele ira receber o valor de login
            const { name = login, avatar_url, bio } = apiResponse.data;
            //recebe as tecnologias em formato de string e converte para array apartir da virgula
            const techsArray = parseStringAsArray(techs);
            
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            }

            //usa short sintax como o nome da propriedade e da variavel é o mesmo fica opcional
            //exceto no caso de techs que o valor da propriedade esta em uma variavel de nome diferente 
            dev = await Dev.create({
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
        }
       
        return response.json(dev);
    }

    //fazer os metodos update e detroy
}