//v.002

var http = require('http');
var fs = require('fs');
var path = require('path');

var person = {firstName:"John", lastName:"Doe", age:20, eyeColor:"blue", 
			likes:["animals", "cars", "games"]};


http.createServer(function (request, response) {
    console.log('request starting...');
    
    var url = request.url;
    
    var parsedURL = require('url').parse(url, true);
    console.log(parsedURL);
    console.log(parsedURL.query.query);
    
    var contentType = 'text/html';
    
    
    
    if(parsedURL.pathname === "/json")
    {	
		var command = parsedURL.query.command;
		
		var operand = parsedURL.query.operand;
		
		console.log("COMMAND: " + command + ", " + operand);

		
		if(command === "get")
		{
			console.log("RESULT: " + JSON.stringify(person[operand]));
			
			response.writeHead(200, { 'Content-Type': contentType });
	
			response.end(JSON.stringify(person[operand]), 'utf-8');
		}
		else
		{			  
			console.error('Error running query');
			response.writeHead(500);
			response.end();
			return;
		};

    	return;
    };    
    
    
    // Handle requests to serve files.
    
	var filePath = '.' + request.url;
	
	if (filePath == './') filePath = './index.html';
		
	var extname = path.extname(filePath);
	
	switch (extname) {
		case '.js':
			contentType = 'text/javascript';
			break;
		case '.css':
			contentType = 'text/css';
			break;
		case '.html':
			contentType = 'text/html';
			break;
	}
	
	fs.exists(filePath, function(exists) {
	
		if(exists) {
			fs.readFile(filePath, function(error, content) {
				if(error) {
					response.writeHead(500);
					response.end();
				}
				else {
					response.writeHead(200, { 'Content-Type': contentType });
					response.end(content, 'utf-8');
				}
			});
		}
		else {
			response.writeHead(404);
			response.end();
		}
	});
	
}).listen(8000);
console.log('Server running at http://127.0.0.1:8000/');
// http://localhost:8000/json?command=get&operand=age
// JSON.parse(jsonString);

