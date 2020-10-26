/**
 * 图片相关操作
 */

// ? 图片预览

{/* <input type="file" accept="image/*" onchange="loadFile(event)">
<img id="output"/> */}
const loadFile = function(event) {
  const reader = new FileReader();
  reader.onload = function(){
    const output = document.querySelector('output');
    output.src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
};

// ? 图片上传：把图片对应的 Data URLs 数据提交到服务器
const app = require('express')();
app.post('/upload', function(req, res){
    let imgData = req.body.imgData; // 获取POST请求中的base64图片数据
    let base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = Buffer.from(base64Data, 'base64');
    fs.writeFile("image.png", dataBuffer, function(err) {
        if(err){
          res.send(err);
        }else{
          res.send("图片上传成功！");
        }
    });
});

// ? 图片压缩：利用 Canvas 对象提供的 toDataURL()
function compress(base64, quality, mimeType) {
  let canvas = document.createElement("canvas");
  let img = document.createElement("img");
  img.crossOrigin = "anonymous";
  return new Promise((resolve, reject) => {
    img.src = base64;
    img.onload = () => {
      let targetWidth, targetHeight;
      if (img.width > MAX_WIDTH) {
        targetWidth = MAX_WIDTH;
        targetHeight = (img.height * MAX_WIDTH) / img.width;
      } else {
        targetWidth = img.width;
        targetHeight = img.height;
      }
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      let ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, targetWidth, targetHeight); // 清除画布
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      let imageData = canvas.toDataURL(mimeType, quality / 100);
      resolve(imageData);
    };
  });
}

// ? Data URL 转 Blob
function dataUrlToBlob(base64, mimeType) {
  let bytes = window.atob(base64.split(",")[1]);
  let ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeType });
}
