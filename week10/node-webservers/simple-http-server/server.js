const http = require('http');

const port = process.argv[2] || 8888;

http.createServer( (request, response) => {
  console.log('request:', request.url);

  response.writeHead(200, { 'Content-type': 'text/html' });
  // response.write('Hello World!');

  switch( request.url ){
    case '/dogs':
    response.write('<h1>Yeah nah dogs!</h1>');
    break;
    case '/cops':
    response.write('No cops!');
    break;
    default:
    response.write('Totally!');
  }

  response.end();

})
.listen( port );

console.log(`Listening for HTTP connections on port ${port}...`);
