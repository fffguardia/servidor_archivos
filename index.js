const http = require('http')
const fs = require('fs')

const hostname = '127.0.0.1';
const port = 3000;

const mime = {
    'html': 'text/html',
    'css': 'text/css',
    'jpg': 'image/jpg',
    'ico': 'image/x-icon',
    'mp3': 'audio/mpeg3',
    'mp4': 'video/mp4'
  }
 
// creamos con el content type del archivo que vamos a servir
const HTML_CONTENT_TYPE = 'text/html'
 
// creamos el servidor web
const servidorweb = http.createServer((pedido, respuesta) => {
    const url = new URL('http://localhost:3000' + pedido.url)
    let camino = 'static' + url.pathname
    if (camino == 'static/')
      camino = 'static/index.html'
    fs.stat(camino, error => {
      if (!error) {
        fs.readFile(camino, (error, contenido) => {
          if (error) {
            respuesta.writeHead(500, { 'Content-Type': HTML_CONTENT_TYPE })
            respuesta.write('Error interno')
            respuesta.end()
          } else {
            //escribimos en la respuesta el status code de 200 y el content type que necesitamos
            const vec = camino.split('.')
            const extension = vec[vec.length - 1]
            const mimearchivo = mime[extension]
            respuesta.writeHead(200, { 'Content-Type': mimearchivo })
            respuesta.write(contenido)
            respuesta.end()
          }
        })
      } else {
        respuesta.writeHead(404, { 'Content-Type': HTML_CONTENT_TYPE })
        respuesta.write('<!doctype html><html><head></head><body>Error 404. El enlace no existe o ha dejado de existir.</body></html>')
        respuesta.end()
      }
    })
  })
  
// hacemos que el servidor escuche el puerto configurado
servidorweb.listen(port, hostname, () => {
    console.log(`Servidor funcionando en http://${hostname}:${port}/`);
});
  