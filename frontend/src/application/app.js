// This is the scss entry file
import "../styles/index.scss";

// We can import Bootstrap JS instead of the CDN link, if you do not use
// Bootstrap, please feel free to remove it.
import "bootstrap/dist/js/bootstrap.bundle";

// We can import other JS file as we like
import "../components/sidebar";
import {io} from "socket.io-client";

const socket = io();

socket.on('connect', () => {
  console.log('conectado');
});

socket.on('open_pdf', () => {
  window.open('pdf');
});

const crear = document.getElementById('crear');
crear.addEventListener('click', (event) => {
  event.preventDefault();
  const titulo = document.getElementById('titulo').value;
  const autor = document.getElementById('autor').value;
  const helis = Array.from(document.getElementById('helis').querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
  const historico = Array.from(document.getElementById('historicos').querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
  socket.emit('crear', {
    titulo: titulo,
    autor: autor,
    historico: historico,
    helis: helis
  });
});
window.document.addEventListener("DOMContentLoaded", function () {
  window.console.log("dom ready 1");
});
