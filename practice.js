//////////////////////////////////////////////async await 写法
const fucker = function() {
	const date = new Date();
	const day = date.getDay();
	const weekend = ['星期7','星期1','星期2','星期3','星期4','星期5','星期6']
	const today = weekend[day];
	return new Promise((resolve,reject)=>{
		resolve(today)
	})
}
const crazyThursday = async ()=>{
	const today1 = '星期四';
	const index1 = 4;
	const day1 = await fucker();
	const index2 = Number(day1.split('')[2]);
	let result = '';
	index2===index1? result=`今天${today1}，请V我50`:index2>index1? result=`再等${7-(index2-index1)}天`:result=`还差${Math.abs(index2-index1)}天`
	return result;
}
crazyThursday();
////////////////////////////////////////////////generator写法
const fucker1 = function() {
	const date = new Date();
	const day = date.getDay();
	const weekend = ['星期7','星期1','星期2','星期3','星期4','星期5','星期6']
	const today = weekend[day];
	return new Promise((resolve,reject)=>{
		resolve(today)
	})
}
const Num = function *(){
	const day = yield fucker1();
	return day;
}
const value = Num();
function crazycrazyThursday(values){
	const day = value.next();
	if(day.done===false){
	let date ;
	day.value.then((item)=>{date=Number(item.split('')[2]);
	const index = 4;
    const today = '星期四';
    let result;
    date===index? result=`今天${today}，请V我50`:date>index? result=`再等${7-(date-index)}天`:result=`还差${Math.abs(date-index)}天`
	console.log(result)});
	}else{
		crazycrazyThursday();
	}
}
crazycrazyThursday();	
//////////////////////////////////////////////////混淆练习，用随机的16进制字符串混淆
//制作16进制字符表，随机
const arr = new Int16Array(20);
function charStr(str){
	const arr = str.split('');
	const len=arr.length;
	for(let i=0;i<len;i++)arr[i]=arr[i].charCodeAt(0);//const报错，理由，每次继承时都会改变const声明的值
	const arr16=new Int8Array(arr);
	const newarr=globalThis.crypto.getRandomValues(arr16);
	const leng=newarr.length;
    for(let i=0;i<leng;i++)newarr[i]=newarr[i].toString(16);
    return newarr;
};
charStr('wohenqiang');
//const b='i'.charCodeAt(0);
const ar = new Int16Array()
//console.log(globalThis.crypto);
//const strr='wo';
//const ab=strr.charCodeAt(0);
//console.log(ab);
const obj={
	name:'cxk',
	age:18,
	sayAge(){
    return {
	Age:this.age
	}
  }
}
console.log(obj['sayAge']['Age']);////undefined   this属于运行时的一个东西
////////////////////////////////////////////////////////////手写promise
class promise{
	static state='Pending';
	static value=undefined;
	static result=undefined;
	static reason=undefined;
	constructor(func){		
    if (typeof func !=='function')throw new Error('you must prompt a function');
    try{func(promise.resolve,promise.reject)}catch(e){promise.reject(e)}
  }
    static resolve(value){
	if(promise.state==='Pending'){
		promise.state='Fulfilled';
		promise.value=value
    return promise.value;
	}
 }
    static reject(value){
    if(promise.state==='Pending'){
		promise.state='Rejected';
		promise.reason=value;
		promise.prototype.catch(promise.reason)
	}
 }  
    catch(value){
    promise.result=value;
	}
	finally(value){
	promise.result=value;
	}
    then(OnFulfilled,OnRejected){
    if(typeof OnFulfilled !=='function'||typeof OnRejected !=='function'||(typeof OnFulfilled !=='function'&&typeof OnRejected !=='function')){
		throw new Error('arguments must to be a function');
	}
    if(promise.state==='Fulfilled'){
		OnFulfilled(promise.value);
	}
    if(promise.state==='Rejeted'){
		OnRejected(promise.reason);
	}
 }
}
let p = new promise((resolve, reject) => {
	console.log('start')
	resolve('666')
  })
  p.then((res) => {
	console.log('success:' + res);
  }, (err) => {
	console.log('fail' + err);
  })
  ////////////////////////////////////////////////////////////iterator
  //1.类数组对象
  const object={
	0:40,
	1:50,
	2:90,
	length:3
	}
  //2.类数组转换为数组，分支有几种方法
  //Array.from
  //const array=Array.from(object);
  //array instanceof Array? true:false;//true
  //console.log(array);
  //iterator
  object[Symbol.iterator]=function(){
	let start=this[0],end=this[2];
	return {
		next(){
			if(start<=end){
				return {
               value:start++,
			   done:false
				}
			}else if(start>end){
				return{
					done:true
				}
			}
		}
	}
}

for(const item of object){
console.log(item);
}///////////////////////////两种方法结束
/////////////物种构造器的使用,变更了构造器的函数会覆盖默认的构造函数，子类的方法会返回重新规定的对象。
class Fuck{
	constructor(name){
    console.log(name);
	}
	static get [Symbol.species](){
		return String;
	}
}
class Fuckerman extends Fuck{
   static get [Symbol.species](){
	return Array;
   }
   say(sex){
	return new Fuckerman[Symbol.species](sex);
   }
}
const otk=new Fuck('niubi');
otk instanceof String? console.log(true):console.log(false);//false
const atk=new Fuckerman('wo666');
atk instanceof Fuck? console.log('Fuck'):console.log('Array');//FucK
const newotk=atk.say(6,7,8);
newotk instanceof Array?console.log('Array'):console.log('Fuckerman');//Array
//////////////////////////////////正常情况下，Symbol.species 属性返回this，get Symbol.species 更改了指向，因而返回了新的对象。常规的数组方法map等都是用了该方法返回新对象。
//玩一下proxy,例子1
const handle={
	get(obj,props){//这里规定handle 的两个参数前面必须是对象，后面是属性？
    return props in obj? obj[props]:undefined;
	}
}
const proxy = new Proxy({},handle);//handle 理解为一个方法，来判断对象{}的举动和内容
proxy.a=6;
proxy.b=undefined;
console.log(proxy.a,proxy.b,'sm'in proxy);//6,undefined,false
//////例子2
const oct ={
	get(obj,props){
    return props in obj? obj[props]:undefined;// 属性名 in 对象 ，所以props本身就是字符串；通过该方法的判定会对原目标对象进行修改属性。
	},
	set(obj,props,value){
		if(props==='Box'){
		if(value>1000){
			throw new RangeError('you can not smash too many Boxes at a time');
		}
   return obj[props]=value;
	//return true;//原来注释掉失败的部分： return props in obj? obj[props]=value:console.error('你必须输入该对象的一个属性')
	}
  }
}
const pro = new Proxy({},oct);
pro.Box=100;
console.log(pro.Box);//讨论执行流程: Proxy对象每次接受两个参数，target传导给了handle的第一个obj参数，并通过伪对象handle来管控目标的行为和属性。
///////通过Proxy的handle的set和get方法来控制对象行为，通过construt和apply等来控制类和函数的行为。想要操控什么，handle就得有对应的属性
//////////////例子3，扩充构造函数
function extend(basefunc,extendfunc){
   const descriptor = Object.getOwnPropertyDescriptor(basefunc.prototype,'constructor');
   basefunc.prototype = Object.create(extendfunc.prototype);
   const handle={
	construct(target,args){//proxy的construct必须返回一个对象，否则报错，同时可以接受两个参数
    const obj = Object.create(basefunc.prototype);
	this.apply(target,obj,args);//call,apply,bind处于对象领域呼叫，不局限于function
	return obj;
	},
	apply(target,obj,args){//apply方法接受的上下文的this
	basefunc.apply(obj,args);
	extendfunc.apply(obj,args);
   }
  };
    const proxy = new Proxy(basefunc,handle);
	descriptor.value = proxy;
	Object.defineProperty(basefunc.prototype,'constructor',descriptor);
	return proxy;
}//////整体是通过原型链的方式继承。流程就是用后面函数的构造函数扩充目标函数,依次运行原构造函数，然后目标函数的构造函数等于扩充后的构造函数。
const Person = function (name) {
	this.name = name
  };
  
const Boy = extend(Person, function (name,age) {
	this.age = age;
  });
  
  Boy.prototype.sex = "M";
  
  const Peter = new Boy("Peter", 13);
  console.log(Peter.sex);  // "M"
  console.log(Peter.name); // "Peter"
  console.log(Peter.age); //13
  /////////////////////////////////////////////////
