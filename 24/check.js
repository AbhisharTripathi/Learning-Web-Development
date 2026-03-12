function fun1() {
    fun2();
}

function fun2(){
   let id = setInterval(()=>{console.log("hello world");}, 1000);//it will print only 3 times even if we set 
   // setTimeout(()=>{clearInterval(id);},3999);
   setTimeout(()=>{clearInterval(id);},3999);
}

fun1();
