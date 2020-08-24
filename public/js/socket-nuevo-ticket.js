
// Comando para establecer conexion
var socketIO = io();

var label = $('#lblNuevoTicket');

socketIO.on('connect', (data) => {
    console.log('Conectado al servidor');
});

socketIO.on('estadoActual', (siguienteTicket) => {
    label.text(siguienteTicket.ultimoTicket);
});

socketIO.on('disconnect', (data) => {
    console.log('Desconectado del servidor');
});

$('button').on('click', function(){
    socketIO.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});