import {createServer} from 'node:http'
import { createStudent, deleteStudent, getParsedParams, getStudents,getTemplate } from './utils/utils.js';
import { readFileSync } from 'node:fs';
import querystring from "node:querystring";
import { text } from "node:stream/consumers";
const server = createServer(async(req,res) =>{

 

    if(req.url === '/'){
           res.writeHead(200, { "Content-type": "text/html" });
         const html = getTemplate("./view/homeTemplate.pug");
         res.end(html)
         return
    }
     if(req.url === '/users'){
        const students = getStudents()

           res.writeHead(200, { "Content-type": "text/html" });
         const html = getTemplate("./view/usersTemplate.pug", {students} );
         res.end(html)
         return
    }

    if(req.url === '/users/create' && req.method === "POST"){

       const parsedParams = await getParsedParams(req)
      if (parsedParams.name && parsedParams.birth) {
        createStudent(parsedParams);
        res.writeHead(302, {
          Location: "/users",
        });
        res.end();
        return
      }else{
        res.writeHead(404);
        res.end("<p>Paramètre manquants</p>");
        return
      }
    }

    if(req.url === '/users/delete' && req.method === "POST"){

       const parsedParams = await getParsedParams(req)
      if (parsedParams.name && parsedParams.birth) {
        deleteStudent(parsedParams);
        res.writeHead(302, {
          Location: "/users",
        });
        res.end();
        return
      }else{
        res.writeHead(404);
        res.end("<p>Paramètre manquants</p>");
        return
      }
    }

    res.writeHead(404);
    const html = getTemplate("./view/404.pug");
    res.end(html)
})


server.listen(8888, () =>{
    console.log('server listening')
})