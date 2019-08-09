// var net=require('net')
// var server=net.createServer()
// server.on('connection',(socket)=>{
//     socket.write('hello')
//     socket.end()
// })
// server.listen(3000)

var net=require('net')
var server=net.createServer() 
var socketList=new Set()
server.on('connection',(socket)=>{
    console.log(socket)
    socketList.add(socket)
    console.log('当前client的数量：'+socketList.size)
    socket.on('data',(data)=>{
        socketList.forEach((client)=>{
            if(socket!=client){
                client.write(data)
            }
        })
    })
    socket.on('close',(hasError)=>{
        socketList.delete(socket)
        console.log(`client断开，当前客户端数量${socketList.size}是否异常退出${hasError}`)
    })
})
server.listen(3000,()=>{
    var addr=server.address()
    console.log(`Server started,listen port ${addr.port}`)
})