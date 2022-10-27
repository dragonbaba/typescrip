import{PluginManager}from './js/rmmz_managers.js';
interface read{
    param:(obj:Object|any,arr:any[])=>void;
}
namespace readparam{
let Read_Plugin_Parameters:()=>void;
Read_Plugin_Parameters=function(){
    //获取插件参数
    let pluginName = 'Read_Plugin_Parameters';
    let parameters = PluginManager.parameters(pluginName);
    let obj:Object|any={};
    let arr:any[]=[];
    let read:read;
    read={
        param:function(obj,arr){
            for(let i in obj){
                if(typeof obj[i]==='object'){
                    read.param(obj[i],arr);
                }else{
                    arr.push(obj[i]);
                }
            }
        }
    }
    read.param(parameters,arr);
    console.log(arr);
    
}
}