
// Comando para establecer conexion
var socketIO = io();

var searchParams = new URLSearchParams(window.location.search);

if( !searchParams.has('escritorio') ){
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

/* console.log('searchParams ', searchParams); */

var escritorio = searchParams.get('escritorio');
var label =  $('small');

console.log('escritorio ', escritorio);

/* socketIO */

$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', () => {

   socketIO.emit('atenderTicket', { escritorio: escritorio }, (resp)=>{
       if (resp === 'No hay tickets') {
           label.text(resp);
           alert(resp);
           return;
       } else {
           label.text(`Ticket ${resp.numero}`);
       }
   });

});