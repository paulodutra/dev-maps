import socketio from 'socket.io-client';


const socket = socketio('http://172.16.10.98:3339', {
    autoConnect: false // conexão automatica 
});

/**
 * subscribeToNewDevs: Responsável por ouvir o evento new-dev(toda vez que um novo dev) é cadastrado
 * para posteriormente ser marcado no mapa de todos os usuários que estão em um raio abaixo de 10km
 * o novo dev que foi cadastrado
 * @param {*} subscribeFunction 
 */
function subscribeToNewDevs(subscribeFunction){
    //escutando a mensagem enviada
    socket.on('new-dev', subscribeFunction);
}

/**
 * connect: Connecta o client ao servidor websocket e envia os dados recebidos no parametro de busca
 * @param {*} latitude 
 * @param {*} longitude 
 * @param {*} techs 
 */
function connect(latitude, longitude, techs){
    //enviandos os parametros para o socket.io server
    socket.io.opts.query ={
        latitude, 
        longitude, 
        techs
    }
    socket.connect();

    //escutando a mensagem enviada
    /*socket.on('message', text => {
        console.log(text);
    });*/
}

/**
 * disconnect: Desconecta um client do servidor websocket
 */
function disconnect(){
    //caso o websocket esteja conectado
    if(socket.connected){
        socket.disconnect();
    }
}

export {
    connect,
    disconnect,
    subscribeToNewDevs
}