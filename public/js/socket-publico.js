
// Comando para establecer conexion
var socketIO = io();

var lblTicket1 = $('#lblTicket1');
var lblTicket2 = $('#lblTicket2');
var lblTicket3 = $('#lblTicket3');
var lblTicket4 = $('#lblTicket4');

var lblEscritorio1 = $('#lblEscritorio1');
var lblEscritorio2 = $('#lblEscritorio2');
var lblEscritorio3 = $('#lblEscritorio3');
var lblEscritorio4 = $('#lblEscritorio4');

let lblTicket = [ lblTicket1, lblTicket2, lblTicket3, lblTicket4 ];
let lblEscritorio = [ lblEscritorio1, lblEscritorio2, lblEscritorio3, lblEscritorio4 ];

socketIO.on('estadoActual', (resp)=>{
    actualizaHTML(resp.ultimos4);
});

socketIO.on('ultimos4', (resp) => {

    var audio = new Audio('audio/new-ticket.mp3');
    audio.play();
    actualizaHTML(resp.ultimos4);
});

function actualizaHTML( ultimos4 ){

    if ( ultimos4.length === 0 ) {

        // No hay tickets por atender

    } else { 
        for( let i=0; i < ultimos4.length; i++ ) {
            lblTicket[i].text(`Ticket ${ultimos4[i].numero}`);
            lblEscritorio[i].text(`Ecritorio ${ultimos4[i].escritorio}`);
        }
    }

}