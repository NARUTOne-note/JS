var App = angular.module('myApp',[]);
App.controller('myCtrol',['$scope', function($scope) {
	//构造对象
	function sizeObj() {
		this.type = null;
		this.width = null;
		this.height = null;
		this.visWidth = null;
		this.visHeight = null;
		this.otherWidth = null;
		this.otherHeight = null;
	}
	sizeObj.prototype.addMsg = function(msg) {
		this.msg = msg;
	}
	
	$scope.result = [];
	
	// 屏幕
	function getScreen() {
		const obj = new sizeObj();
		obj.type = '屏幕';
		obj.width = screen.width;
		obj.height = screen.height;
		obj.visWidth = screen.availWidth;
		obj.visHeight = screen.availHeight;
		obj.otherWidth = screen.width - screen.availWidth;
		obj.otherHeight = obj.height - obj.visHeight;
		
		$scope.result.push(obj)
	}
	
	// 浏览器 
	function getWindow() {
		const obj = new sizeObj();
		obj.type = '浏览器';
		obj.width = window.outerWidth;
		obj.height = window.outerHeight;
		obj.visWidth = window.innerWidth;
		obj.visHeight = window.innerHeight;
		obj.otherWidth = window.outerWidth - window.innerHeight;
		obj.otherHeight = obj.height - obj.visHeight;
		
		$scope.result.push(obj)
	}
	
	//页面body
	
	//大多数情况下，都是document.documentElement.clientWidth返回正确值。
	//但是，在IE6的quirks模式中，document.body.clientWidth返回正确的值，因此函数中加入了对文档模式的判断。
	function getViewport(){
		const obj = new sizeObj();
		obj.type = '页面body';
			obj.width = document.body.offsetWidth;
			obj.height = document.body.offsetHeight;
　　　if(document.compatMode == "BackCompat") {
　　　　obj.visWidth = document.body.clientWidth;
　　　　obj.visHeight = document.body.clientHeight;
　　　} else {
　　　　obj.visWidth = document.documentElement.clientWidth;
　　　　obj.visHeight = document.documentElement.clientHeight;
　　　}

			obj.otherWidth = obj.width - obj.visWidth;
			obj.otherHeight = obj.height - obj.visHeight;
			
			$scope.result.push(obj)
　　}
		
		/*
		  网页上的每个元素还有scrollHeight和scrollWidth属性，指包含滚动条在内的该元素的视觉面积。
		  那么，document对象的scrollHeight和scrollWidth属性就是网页的大小，意思就是滚动条滚过的所有长度和宽度。
		  如果网页内容能够在浏览器窗口中全部显示，不出现滚动条，那么网页的clientWidth和scrollWidth应 该相等。
		  但是实际上，不同浏览器有不同的处理，这两个值未必相等。所以，我们需要取它们之中较大的那个值
		*/
		
		function getPagearea(){
			const obj = new sizeObj();
			obj.type = '页面body';
			obj.width = document.body.offsetWidth;
			obj.height = document.body.offsetHeight;
　　　if(document.compatMode == "BackCompat") {
　　　　obj.visWidth = Math.max(document.body.scrollWidth,
　　　　　　　　　　　　　　　　document.body.clientWidth);
　　　　obj.visHeight = Math.max(document.body.scrollHeight,
　　　　　　　　　　　　　　　　document.body.clientHeight);
　　　} else {
　　　　obj.visWidth = Math.max(document.documentElement.scrollWidth,
　　　　　　　　　　　　　　　　document.documentElement.clientWidth);
　　　　obj.visHeight = Math.max(document.documentElement.scrollHeight,
　　　　　　　　　　　　　　　　document.documentElement.clientHeight);
　　　}

			obj.otherWidth = obj.width - obj.visWidth;
			obj.otherHeight = obj.height - obj.visHeight;
			
			$scope.result.push(obj)
　　}
		
	//element
	function getElementSize(type, elem) {
		const obj = new sizeObj();
		obj.type = type;
		obj.width = Math.max(elem.scrollWidth,
　　　　　　　　　　　　　　　　elem.clientWidth);
		obj.height = Math.max(elem.scrollHeight,
　　　　　　　　　　　　　　　　elem.clientHeight);
　　 obj.visWidth = elem.clientWidth;
		obj.visHeight = elem.clientHeight;

		obj.otherWidth = obj.width - obj.visWidth;
		obj.otherHeight = obj.height - obj.visHeight;
			
		$scope.result.push(obj)
	}
		
	//执行
	window.onload = {
		
	}
	getScreen();
	getWindow();
	getViewport();
	getElementSize('demo容器', document.getElementsByClassName('demo-content')[0])
	
//	console.log($scope.result)

	//div-content
	var contentEle = document.getElementsByClassName('div-content')[0]
	$scope.contentDiv = {
		clientWidth: contentEle.clientWidth,
		clientHeight: contentEle.clientHeight,
		offsetWidth: contentEle.offsetWidth,
		offsetHeight: contentEle.offsetHeight,
		clientTop: contentEle.clientTop,
		clientLeft: contentEle.clientLeft,
		offsetLeft: contentEle.offsetLeft,
		offsetTop: contentEle.offsetTop,
		scrollWidth: contentEle.scrollWidth,
		scrollHeight: contentEle.scrollHeight,
	}
}])
