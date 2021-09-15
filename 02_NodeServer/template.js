const http = require('http');
const fs = require('fs');
const ejs = require('ejs');

const name = 'mylee';
const list = [
    {name: 'first'}, {name: 'second'}, {name: 'third'}
];

const server = http.createServer((req, res)=>{
    res.setHeader("Content-Type","text/html");
    if(req.url === '/') {
       ejs.renderFile('./template/hello.ejs', {name}).then((data) => {
           res.end(data);
       }); // {name: name} 키와 밸류의 이름이 같으면 생략가능
    } else if(req.url === '/list') {
        ejs.renderFile('./template/list.ejs', {list}).then((data) => {
            res.end(data);
        }); // {list: list} 키와 밸류의 이름이 같으면 생략가능
    } else {
        ejs.renderFile('./template/NotFound.ejs', {name}).then((data) => {
            res.end(data);
        }); // {name: name} 키와 밸류의 이름이 같으면 생략가능
    }
});

server.listen(8080);