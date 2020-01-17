import React from 'react';
import { StatusBar, YellowBox } from 'react-native';

import Routes from './src/routes';

//ignora o aviso do socket.io para o react-native

YellowBox.ignoreWarnings([
  'Unrecognired WebSocket'
])

/**
 * StatusBar: Barra de status superior que apresenta as informações relacionada
 * a porcentagem de bateria, memória, sinal da rede e etc.
 */
export default function App() {
  return (
    <>
    <StatusBar barStyle="light-content" backgroundColor="#7D40E7"/>
    <Routes />
    </>
  );
}
