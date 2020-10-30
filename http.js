const http = require('http');
http.createServer(function(request,response){
    console.log(request)
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.end(666);
}).listen(3000)
