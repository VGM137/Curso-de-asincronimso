// Implementación: ene ste caso va a trabajar sobre node, por lo que necesitamos instalar una dependencia que nos va a permitir hacer peticiones a diferentes recursos, en este caso a la api de rick and morty, el comando es: npm install xmlhttprequest --save (save para instalarla como un dependencia de desarrollo)
// AHora hay que instanciar el request
let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest; //Propiedad para hacer instancias a un llamado (a una API) desde JS
//Crear función que permita traer informacion desde la API
let API = 'https://rickandmortyapi.com/api/character/'

function fetchData(url_api, callback){
  let xhttp = new XMLHttpRequest()//Generar referencia al objeto que se necesita
  xhttp.open('GET', url_api, true)//Hacer un llamado
  //Escuchar un evento
  xhttp.onreadystatechange = function(event){
    //validar el estado y el status
    if(xhttp.readyState === 4){
      if(xhttp.status === 200){
        callback(null, JSON.parse(xhttp.responseText))
      }else{
        const error = new Error('Error ' + url_api)
        return callback(error, null)
      }
    }
  }
  xhttp.send()
}

fetchData(API, function(error1, data1){
  if(error1) return console.error(error1);
  fetchData(API + data1.results[0].id, function(error2, data2){
    if(error2) return console.error(error2)
    fetchData(  data2.origin.url, function(error3, data3){
      if(error3) return console.error(error3)
      console.log(data1.info.count)
      console.log(data2.name)
      console.log(data3.dimension)
    })
  })
}) 