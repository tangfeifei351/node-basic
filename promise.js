
function Promise(fn) {
    var  succallbacks = [], failcallbacks = [];
    this.then = function (fulfilled, rejected) {
        succallbacks.push(fulfilled);
        failcallbacks.push(rejected);
        return this;   //加入链式调用，注意bluebird 或者原生promise中是返回一个新的promise，这样只是为了方便，
    }

    function resolve(value) {
        setTimeout(function() {   //加入延时
            succallbacks.forEach((callback) => {
                callback(value);
            })

        }, 0)
    }

    function reject(value) {
        setTimeout(function() {
            failcallbacks.forEach((callback) => {
                callback(value);
            })

        }, 0)
    }

    fn(resolve, reject);
}

function fn(num) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {   //此时去掉time 也能执行
            resolve(num);
        }, 1000)
    })
}

fn(1).then(data => {  //可以链式调用
        console.log(data);
    }
).then(data=>{
    console.log(data)
});