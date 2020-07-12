/**
* 下载文件: 发请求获取二进制数据，转化为Blob对象，利用URL.createObjectUrl生成url地址，赋值在a标签的href属性上，结合download进行下载
* @short 
  IE10以下不支持。
  在Safari浏览器上访问Blob Url或Object URL当前是有缺陷的，如下文中通过URL.createObjectURL生成的链接
* @param {String} path - 下载地址/下载请求地址。
* @param {String} name - 下载文件的名字/重命名（考虑到兼容性问题，最好加上后缀名）
*/
function downloadFile (path, name) {
   const xhr = new XMLHttpRequest();
   xhr.open('get', path);
   xhr.responseType = 'blob';
   xhr.send();
   xhr.onload = function () {
       if (this.status === 200 || this.status === 304) {
           // 如果是IE10及以上，不支持download属性，采用msSaveOrOpenBlob方法，但是IE10以下也不支持msSaveOrOpenBlob
           if ('msSaveOrOpenBlob' in navigator) {
               navigator.msSaveOrOpenBlob(this.response, name);
               return;
           }
           // const blob = new Blob([this.response], { type: xhr.getResponseHeader('Content-Type') });
           // const url = URL.createObjectURL(blob);
           const url = URL.createObjectURL(this.response);
           const a = document.createElement('a');
           a.style.display = 'none';
           a.href = url;
           a.download = name;
           document.body.appendChild(a);
           a.click();
           document.body.removeChild(a);
           URL.revokeObjectURL(url);
       }
   };
}


// base64

/**
 * 下载文件
 * @param {String} path - 下载地址/下载请求地址。
 * @param {String} name - 下载文件的名字（考虑到兼容性问题，最好加上后缀名）
 */
function downloadFileBybase64 (path, name) {
  const xhr = new XMLHttpRequest();
  xhr.open('get', path);
  xhr.responseType = 'blob';
  xhr.send();
  xhr.onload = function () {
      if (this.status === 200 || this.status === 304) {
          const fileReader = new FileReader();
          fileReader.readAsDataURL(this.response);
          fileReader.onload = function () {
              const a = document.createElement('a');
              a.style.display = 'none';
              a.href = this.result;
              a.download = name;
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
          };
      }
  };
}

