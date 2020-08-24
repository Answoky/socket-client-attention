const { io } = require('../server');

const { TicketControl } = require('../classes/ticket-control')

let ticketControl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback)=> {
        let siguienteTicket = ticketControl.siguienteTicket();
        callback(siguienteTicket);
    });

    // Emitir estado actual
    client.emit('estadoActual', {
        ultimoTicket: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    client.on('atenderTicket', (data, callback) => {

        if ( !data.escritorio ){
            return callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        } else {
            let atenderTicket = ticketControl.atenderTicket(data.escritorio);
            callback(atenderTicket); 
        }
        
        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4()
        })

    });

});


/* client.emit('enviarMensaje', {
    usuario: 'Administrador',
    mensaje: 'Bienvenido a esta aplicación'
});



client.on('disconnect', () => {
    console.log('Usuario desconectado');
});

// Escuchar el cliente
client.on('enviarMensaje', (data, callback) => {

    console.log(data);

    client.broadcast.emit('enviarMensaje', data);


    // if (mensaje.usuario) {
    //     callback({
    //         resp: 'TODO SALIO BIEN!'
    //     });

    // } else {
    //     callback({
    //         resp: 'TODO SALIO MAL!!!!!!!!'
    //     });
    // }



}); */