// hello.js

define(['jquery'],function($){
    //变量定义区
    var moduleName = "hello module";
    var moduleVersion = "1.0";
 
    //函数定义区
    var showMessage = function(name){
        if(undefined === name){
            return;
        }else{
            $('#messageBox').html('欢迎访问 ' + name);
        }
    };
 
    //暴露(返回)本模块API
    return {
        "moduleName":moduleName,
        "version": moduleVersion,
        "showMessage": showMessage
    }
});