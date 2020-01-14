const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');

module.exports = {    
    //buscar todos os devs em um raio de 10km
    //filtrar por tecnologia
    async index (request, response){
        
        const { latitude, longitude, techs } = request.query;
        const techsArray = parseStringAsArray(techs);
        
        const devs = await Dev.find({
            techs: {
                //operador logico do mongo
                $in: techsArray,
            },
            location: {
                /**
                 * near operador logico, objetos perto de uma localização, recebe pois parametros um deles é o ponto 
                 * e o outro é a distancia maxima, neste caso esta sendo em metros 10000m = 10km
                 */
                $near:{
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000
                }
            }
        });

        return response.json({ devs });
    }
}