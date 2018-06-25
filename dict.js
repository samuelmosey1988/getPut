const textBody = require("body");
const resources = { "/IP": "Internet Protocol", "/TCP": "Transmission Control Protocol" };
const http = require("http"); 

const hostname = "127.0.0.1"; 
const port =  3000; 

const server = http.createServer((req, res) => {
    //res.statusCode = 200; 
    //res.setHeader("Content-Type", "text/plain");
    //res.end("Hello from Sam!\n"); 
    if(req.method === "GET") {
        if(resources[req.url] === undefined) {
          res.statusCode = 404;
          res.end("ERROR NOT FOUND");
        } else {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          const responseBody = resources[req.url];
          res.end(responseBody);
       }
      }
      else if(req.method === "PUT") {
        res.statusCode = 201;
        textBody(req, res, (err, requestBody) => {
           resources[req.url] = requestBody;
           const responseBody = resources[req.url];
           res.end(responseBody);
         })
       }

}); 

server.listen(port, hostname, () => {
    console.log("Server running at http://${hostname}:${port}/");
});