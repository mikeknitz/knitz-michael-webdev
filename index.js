var http = require('http')

http.createServer( function(request,response){
	response.writeHead(200, {"Content-type": "text/plain"})
	response.end("Hello World\n")
}).listen(process.env.PORT || 3000)
