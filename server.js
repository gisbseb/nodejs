import {createServer} from 'node:http'
import { createStudent, deleteStudent, getParsedParams, getStudents,getTemplate } from './utils/utils.js';
import dotenv from 'dotenv';

dotenv.config();

const {APP_PORT, APP_ENV, APP_LOCALHOST} = process.env

const server = createServer(async(req,res) =>{

    if(req.url === '/'){
           res.writeHead(200, { "Content-type": "text/html" });
         const html = getTemplate("./view/homeTemplate.pug");
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

     if(req.url === '/users'){
        const students = getStudents()
           res.writeHead(200, { "Content-type": "text/html" });
         const html = getTemplate("./view/usersTemplate.pug", {students} );
         res.end(html)
         return
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



server.listen(APP_PORT, () =>{
    console.log('listening on: http://'+ APP_LOCALHOST+":"+APP_PORT)
})