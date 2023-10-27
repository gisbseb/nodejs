import {createServer} from 'node:server'

console.log('ici')
const server = createServer(async(req,res) =>{
    res.end('<p>Iic</p>')
})

server.listen(8888, () =>{
    console.log('server listening')
})