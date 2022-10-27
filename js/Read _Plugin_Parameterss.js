"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rmmz_managers_js_1 = require("./js/rmmz_managers.js");
var readparam;
(function (readparam) {
    let Read_Plugin_Parameters;
    Read_Plugin_Parameters = function () {
        //获取插件参数
        let pluginName = 'Read_Plugin_Parameters';
        let parameters = rmmz_managers_js_1.PluginManager.parameters(pluginName);
        let obj = {};
        let arr = [];
        let read;
        read = {
            param: function (obj, arr) {
                for (let i in obj) {
                    if (typeof obj[i] === 'object') {
                        read.param(obj[i], arr);
                    }
                    else {
                        arr.push(obj[i]);//数组存放参数值
                    }
                }
            }
        };
        read.param(parameters, arr);
        console.log(arr);
    };
})(readparam || (readparam = {}));
