// var net=require('net')
// var client=net.connect({port:3000})
// var data=''
// client.on('data',(chunk)=>{
//     data+=chunk
// })
// client.on('end',()=>{
//     console.log(data)
// })

var repl=require('repl')
var net=require('net')
var nickname
var client
var globalCallback
function connectServer(){
    var client=net.connect({port:3000,host:'127.0.0.1'})
    var data=''
    client.on('connect',()=>{
        console.log('连接服务器成功，聊天己就绪')
    })
    client.on('data',(data)=>{
        var jsonData=JSON.parse(data.toString())
        globalCallback && globalCallback(null,`${jsonData.nickname}:${jsonData.message}`)
    })
    client.on('close',(hasError)=>{
        console.log('client closeed,hasError:'+hasError)
        process.exit()
    })
    return client
}
console.log("weclome to zcj'console chat")
console.log("please input your nickname")
var replInstace=repl.start({
    eval:(cmd,context,filename,callback)=>{
        console.log(callback)
        var cmd=cmd.replace("\n","")
        if(!nickname){
            nickname=cmd
            console.log('connect server....')
            client=connectServer()
            globalCallback=callback
            return
        }
        if(cmd==='exit'){
            client.end()
            return
        }
        var data=JSON.stringify({nickname:nickname,message:cmd})
        client.write(data)//send
        globalCallback(null,`${nickname}:${cmd}`)
    }   
})