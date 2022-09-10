export {};
declare global {
    interface Array<T>{
        including: (...num: T[]) => boolean;
    }
}
let clamp:(num:number,num1:number,num2:number)=>number;
clamp=function (number:number, lower:number, upper:number):number {
  number = +number
  lower = +lower
  upper = +upper
  lower = lower === lower ? lower : 0
  upper = upper === upper ? upper : 0
  if (number === number) {
    number = number <= upper ? number : upper
    number = number >= lower ? number : lower
  }
  return number
}
if(typeof Array.prototype.including === 'undefined') {
    Array.prototype.including = function (...value) {
        let that=this;
        return value.every(function (item) {
            return that.includes(item);
        });
}
}
let compare:(num:number,num1:number)=>string|undefined;
compare=function(num,num1){
    if(num===num1){
      return `${num}=${num1}`;
    }else if(num>num1){
      return `${num}>${num1}`;
    }else if(num<num1){
      return `${num}<${num1}`;
    }
}
let scope:(son: number, father: number,num:number,num1:number) =>void;
    scope=function(son,father,num,num1){
      if((father<=son)&&(son==null||undefined)&&(father==null||undefined)&&(num===null||undefined)&&(num1===null||undefined)&&(num>=num1)){
        throw new Error('你必须依次输入子项，父项，倍率1，倍率2,且子项小于父项，倍率1要小于倍率2');
      }
      const arr = father * num;
      const arr1 = father * num1;
      const result:boolean=arr<son&&son<arr1?true:false;
      return result;
    }
  let Range:(num:number,num1:number,num2:number)=>void;
  Range=function(start,end,value){
    if(start>=end){
      throw new Error('start值必须小于end值');
    }
    //正向
    let arr:number[]=[];
    switch (value) {
      //由大到小，首项大于次项
      case 1:
          while ((start >= 0 || start < 0) && (start >= end)) {
            arr.push(start);
            start--;
          }
          break;
      //由小到大，首项大于次项
      case 2:
          while ((start >= 0 || start < 0) && (start >= end)) {
            arr.push(end);
            end++;
          }
          break;
      case 3://由大到小，次项大于首项
          while((end>=0||end<0)&&(end>=start)){
            arr.push(end);
            end--;
          }
          break;
      case 4://由小到大，次项大于首项
         while((end>=0||end<0)&&(end>=start)){
           arr.push(start);
           start++;
      }
      break;
      default:
      throw new Error('你必须输入输出模式1-4');
  }
    return arr;
  }
 
  