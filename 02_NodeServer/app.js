const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res)=>{
    res.setHeader("Content-Type","text/html");
    if(req.url === '/') {
        fs.createReadStream("./html/hello.html").pipe(res);
    } else {
        fs.createReadStream("./html/NotFound.html").pipe(res);
    }
});

server.listen(8080);