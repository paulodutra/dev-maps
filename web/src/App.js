import React, { useState, useEffect } from 'react';

import api from './services/api';

import './global.css';
import './App.css';
import './Sidebar.css';
import './Main.css';

import DevItem from './components/DevItem';
import DevForm from './components/DevForm';

function App(){

    const [devs, setDevs] = useState([]);

    //useEffect responsável por atualizar a listagem 
    /**
     * useEffect: dispara uma função toda vez que uma informação for alterada 
     * ou uma unica vez durante a renderização do componente, recebe dois parametros
     * o primeiro parametro: qual função ele precisa executar
     * o segundo parametro: quando essa função precisa executar, se tiver vazio ele ira
     * executar uma unica vez, se colocar uma variavel ele executa toda vez 
     * que o valor da variavel por alterado
     */
    useEffect(() => {
        async function loadDevs(){
            const response = await api.get('/devs');

            setDevs(response.data);
        }
        loadDevs();
    }, []); 

    
    async function handleAddDev(data){   
        //faz a requisição para a API
        const response =  await api.post('/devs', data);

        //inclui o ultimo dev cadastrado como ultimo elemento do array dev e atualiza o estado
       setDevs([...devs, response.data]);
    }

    return(
        <div id="app">
            <aside>
                <strong>Cadastrar</strong>
                <DevForm onSubmit={handleAddDev} />
            </aside>
            <main>
                <ul>
                    {devs.map(dev => (
                       <DevItem key={dev._id} dev={dev} />
                    ))}
                </ul>
            </main>

        </div>
    );
}


export default App;