import React from 'react';
import './styles.css';

export default function DevItem(props){
    //faz o destructing e cria um objeto dev apartir do valor de props
    const { dev } = props;
   return (
        <li className="dev-item">
            <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <span>{dev.techs.join(', ')}</span>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`} target="__blank">Acessar perfil no Github</a>
        </li>
   ) 
}