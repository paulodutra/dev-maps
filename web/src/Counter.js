import React, { useState } from 'react';
import Header from './Header';
function Counter() {
  /**
   * o useState retorna um array(vetor), com duas propriedades, para desestruturar(transformar propriedades 
   * de objetos ou indices em variaveis). O segundo parametro é o nome de uma função que será utilizada para alterar o estado  
   * imutabilidade: Não alterar o valor da variavel diretamente, mas sim criar uma nova com o novo valor
  */
  const [counter, setCounter] = useState(0);

  function incrementCounter(){
    setCounter(counter + 1);
  }

  return (
    <>
      <h1>Contador: {counter}</h1>
      <button onClick={incrementCounter}>incrementar</button>
    </>
  );
}

export default Counter;
