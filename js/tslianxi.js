"use strict";
const reg=/(cxk)(喜欢|擅长)唱(跳|rap)/;
const str="cxk喜欢唱rap";
if(str.match(reg)){
    //console.log(RegExp.$1,RegExp.$2,RegExp.$3);
const arr=str.match(reg);
console.log(arr,arr[1],arr[2],arr[3]);
}
//Object.has("cxk喜欢唱rap");
const sb=Symbol('扇贝');
const shanbei={
    [sb]:'扇贝喜欢蔡徐坤',
    do(){
        console.log(this[sb]);
    }
};