/*
 * @File: blob.js
 * @Project: Blob
 * @File Created: Thursday, 29th August 2019 3:54:20 pm
 * @Author: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com)
 * -----
 * @Last Modified: Thursday, 29th August 2019 3:56:36 pm
 * @Modified By: NARUTOne (wznaruto326@163.com/wznarutone326@gamil.com>)
 * -----
 * @Copyright <<projectCreationYear>> - 2019 ***, ***
 * @fighting: code is far away from bug with the animal protecting
 *  ┏┓      ┏┓
 *  ┏┛┻━━━┛┻┓
 *  |           |
 *  |     ━    |
 *  |  ┳┛ ┗┳ |
 *  |          |
 *  |     ┻   |
 *  |           |
 *  ┗━┓     ┏━┛
 *     |      | 神兽保佑 🚀🚀🚀
 *     |      | 代码无BUG！！！
 *     |      ┗━━━┓
 *     |            ┣┓
 *     |            ┏┛
 *     ┗┓┓ ┏━┳┓┏┛
 *      |┫┫   |┫┫
 *      ┗┻┛   ┗┻┛
 */

/**
 * blob对象
 * File.prototype.__proto__ === Blob.prototype
 * Blob(blobParts[, options])
 */

var myBlob = new Blob(
  ["blob 内容"],
  {
    type : "text/plain"
  }
);
console.log(myBlob);

var myReader = new FileReader(); // 读取Blob
myReader.addEventListener('loadend', function (e) {
  console.log(e.srcElement.result);
  // 打印  blob 内容
})
myReader.readAsText(myBlob);

//! blob url
window.URL = window.URL || window.webkitURL
var blob = new Blob(
  ['body { background-color: yellow; }'],
  {type: 'text/css'}
)

// 创建 link 标签
var link = document.createElement('link')
link.rel = 'stylesheet'
link.href = window.URL.createObjectURL(blob) // 创建Blob URL

document.body.appendChild(link); // <link rel="stylesheet" href="blob:null/ba987d05-f219-469c-a7ab-2e66bf2e3af0">

// ! Blob 下载
var xhr = new XMLHttpRequest() 
xhr.open('GET', 'https://avatars1.githubusercontent.com/in/2740') 
xhr.responseType = 'blob'
xhr.onload = function() 
{
  let myImage  = document.querySelector('#imgbox')
  let objectURL = URL.createObjectURL(xhr.response)
  myImage.src = objectURL
}
xhr.send()

/**
 * fetch API

let response = await fetch('https://avatars1.githubusercontent.com/in/2740')
let data = await response.blob()
let objectURL = URL.createObjectURL(data)
let myImage  = document.querySelector('#imgbox')
myImage.src = objectURL
 */

// ! Blob 保存文件 结合 FileSaver（https://github.com/eligrey/FileSaver.js）

/**
 * var text = 'hello world'
var filename = 'blob.txt'
var blob = new Blob([text], {
  type: 'text/plain;charset=utf-8'
})
FileSaver.saveAs(blob, filename)
 */

// 转换canvas  
/*
canvas.toBlob(function(blob){
  //...
}, 'image/jpeg', 0.95) // 图片类型和质量
*/

var canvas = document.getElementById('canvas')

canvas.toBlob(function (blob) {
  var newImg = document.createElement('img')
  var url = URL.createObjectURL(blob)
  newImg.src = url
  document.body.appendChild(newImg)
})