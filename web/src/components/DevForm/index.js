import React, { useState, useEffect }  from 'react';

//{ onSubmit }: faz o destructing direto na propriedade
function DevForm({ onSubmit}) {
    //estado do formulário com Hook
    const [github_username, setGithubUserName] = useState('');
    const [techs, setTechs] = useState('');

    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

     /**
     * useEffect: dispara uma função toda vez que uma informação for alterada 
     * ou uma unica vez durante a renderização do componente, recebe dois parametros
     * o primeiro parametro: qual função ele precisa executar
     * o segundo parametro: quando essa função precisa executar, se tiver vazio ele ira
     * executar uma unica vez, se colocar uma variavel ele executa toda vez 
     * que o valor da variavel por alterado
     */
    useEffect(() => {
        /**
         * obtem a localização do usuário se der certo cai no primeiro callback, caso de errado cai no segundo
         * o terceiro são opções para personalizar, como enableHighAccuracy (para obter a localização mais precisa)
         * do usuário, entretanto da erro se a geolocalização não tiver habilitada no mobile,
         * se tiver na wifi também não funciona
         *  */
        navigator.geolocation.getCurrentPosition(
            (position) => {
                //extrai de dentro da position a latitude e a longitude
                const { latitude, longitude } = position.coords;
                //seta a latitude e longitude ao estado (obtem do browser por meio da api navigator do mesmo)
                setLatitude(latitude);
                setLongitude(longitude);
            },
            (error) => {
                console.log(error);
            },
            {
                timeout: 30000
            }

        )
    },[]);

    async function handleSubmit(e){
        //evita que seja feito o refresh ao submit
        e.preventDefault();
        //faz a requisição utilizando a função que recebeu via propriedade do componente
        await onSubmit( {
            github_username, 
            techs, 
            latitude,
            longitude
        });

        //limpa os campos
       setGithubUserName('');
       setTechs('');
       /*setLatitude('');
       setLongitude('');*/
    }

   return (
            <form onSubmit={handleSubmit}>
                <div className="input-block">
                    <label htmlFor="github_username">Usuário do Github</label>
                    <input 
                        name="github_username" 
                        id="github_username" 
                        value={github_username}
                        onChange={ e => setGithubUserName(e.target.value) }
                        required 
                        />
                </div>
                <div className="input-block">
                        <label htmlFor="techs">Tecnologias</label>
                        <input 
                            name="techs" 
                            id="techs" 
                            value={techs}
                            onChange={ e => setTechs(e.target.value) }
                            required />
                </div>
                <div className="input-group">
                    <div className="input-block">
                        <label htmlFor="latitude">Latitude</label>
                        <input 
                            type="number"
                            name="latitude" 
                            id="latitude"
                            value={latitude}
                            onChange={ e => setLatitude(e.target.value) } 
                            required />
                    </div>
                    <div className="input-block">
                        <label htmlFor="longitude">Longitude</label>
                        <input 
                            type="number"
                            name="longitude" 
                            id="longitude" 
                            value={longitude}
                            onChange={ e => setLongitude(e.target.value) }
                            required />
                    </div>
                </div>
                <button type="submit">Salvar</button>
            </form>

    ) 
}

export default DevForm;