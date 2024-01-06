// This is the scss entry file
import "../styles/index.scss";

// We can import Bootstrap JS instead of the CDN link, if you do not use
// Bootstrap, please feel free to remove it.
import "bootstrap/dist/js/bootstrap.bundle";

// We can import other JS file as we like
import "../components/sidebar";
import {io} from "socket.io-client";

const socket = io();
const provincias = ['Málaga', 'Ourense', 'Pontevedra', 'León', 'Huesca', 'Asturias',
       'Soria', 'Salamanca', 'Lugo', 'Zaragoza', 'Girona', 'Zamora',
       'Cádiz', 'Granada', 'Albacete', 'Ávila', 'Madrid', 'Guadalajara',
       'Tarragona', 'Segovia', 'Alicante / Alacant', 'Huelva', 'Cuenca',
       'Valencia / València', 'Badajoz', 'Castellón / Castelló',
       'Cáceres', 'A Coruña', 'Ciudad Real', 'Cantabria', 'La Rioja',
       'Terras de Trás-os-Montes', 'Burgos', 'Jaén', 'Toledo',
       'Araba/Álava', 'Palencia', 'Navarra', 'Barcelona', 'Sevilla',
       'Valladolid', 'Alto Tâmega', 'Córdoba', 'Lleida', 'Almería',
       'Bizkaia', 'Teruel', 'Gipuzkoa', 'Mallorca', 'Murcia', 'La Palma',
       'Menorca', 'Tenerife', 'Gran Canaria', 'La Gomera',
       'Eivissa y Formentera', 'Ceuta'];
const provinciasDiv = document.getElementById('provinciasDiv');

provincias.forEach((provincia) => {
  const div = document.createElement('div');
  div.classList.add('form-check');
  div.classList.add('form-check-inline');
  const input = document.createElement('input');
  input.classList.add('form-check-input');
  input.setAttribute('type', 'checkbox');
  input.value = provincia;
  const label = document.createElement('label');
  label.classList.add('form-check-label');
  label.innerHTML = provincia;
  div.appendChild(input);
  div.appendChild(label);
  provinciasDiv.appendChild(div);
});


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
  const prov = Array.from(document.getElementById('provinciasDiv').querySelectorAll('input[type="checkbox"]:checked')).map(x => x.value);
  socket.emit('crear', {
    titulo: titulo,
    autor: autor,
    historico: historico,
    helis: helis,
    provincias: prov
  });
});
window.document.addEventListener("DOMContentLoaded", function () {
  window.console.log("dom ready 1");
});
