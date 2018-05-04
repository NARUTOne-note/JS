/*
	@name app
	@author: NARUTOne
	@descript: 入口文件
*/ 

// require 配置 config

require.config({
  paths: {
    jquery: './lib/jquery-1.9.1'
  }
});
 
require(['jquery','./static/js/hello'], function($, hello) {
  alert($().jquery);
  $("#btn").click(function(){
    hello.showMessage("hangge.com");
  });
});