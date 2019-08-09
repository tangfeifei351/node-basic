class EventEmitter{
    constructor(){
      this._events = [];
      this.defaultMaxListeners = 10;
      this.once = false;
    }
    on(eventName,callback){
        if(this._events[eventName]){
          this._events[eventName].push(callback)
        }else{
          this._events[eventName] = [callback]
        }
    }
    emit(eventName,args){
      if(this._events[eventName]){
        this._events[eventName].map((callback)=>callback(args))
      }
    }
    off(eventName,callback){
      if(this._events[eventName]){
        this._events[eventName] = this._events[eventName].filter(fn=>{
          console.log(fn,callback)
          fn!==callback
        })
      }
    }
  }
  
  let ee = new EventEmitter();
  ee.on('say',function(){
    console.log(111);
  })
  let a = function(args){
    console.log(args)
  }
  ee.on('say',a)
  ee.off('say',a)
  ee.emit('say',666)