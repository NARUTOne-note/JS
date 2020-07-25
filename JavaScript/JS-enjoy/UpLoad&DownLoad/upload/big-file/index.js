/**
 * @link https://github.com/yeyan1996/file-upload
 */
const fileInput = document.getElementById("fileInput");
const uploadBtn = document.getElementById("upload");

const SIZE = 10 * 1024 * 1024; // 切片大小

let ufile = null;

function request({
  url,
  method = "post",
  data,
  headers = {},
  requestList
}) {
  return new Promise(resolve => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(key =>
      xhr.setRequestHeader(key, headers[key])
    );
    xhr.send(data);
    xhr.onload = e => {
      resolve({
        data: e.target.response
      });
    };
  });
}

function createFileChunk (file, size=SIZE) {
  const fileChunks = [];
  let cur = 0;
  while (cur < file.size) {
    fileChunks.push({file: file.slice(cur, cur + size)}); // slice
    cur += size;
  }
  return fileChunks;
}

async function uploadChunks (data) {
  const requests = data.map(({chunk, hash}) => {
    const formData = new FormData();
    formData.append("chunk", chunk);
    formData.append("hash", hash);
    formData.append("filename", this.container.file.name);
    return { formData };
  })
  .map(async ({formData}) => {
    return request({
      url: 'http://xxx.xx/api/upload',
      data: formData
    })
  });

  await Promise.all(requests);

  // 主动通知后端进行切片合并
  await mergeFileRequest();
}

async function mergeFileRequest () {
  await request ({
    url: 'http://xxx.xx/api/mergefile',
    headers: {
      'content-type': 'application/json'
    },
    data: JSON.stringify({
      filename: ufile.name
    })
  });
}

async function handleUpload() {
  if (!ufile) return;
  const fileChunkList = createFileChunk(ufile);
  const data = fileChunkList.map(({ file }, index) => ({
    chunk: file,
    hash: ufile.name + "-" + index // 文件名 + 数组下标
  }));
 await uploadChunks(data);
}
  

fileInput.addEventListener('change', function(e) {
  const [file] = e.target.files;
  if (!file) return;
  ufile = file;
}, false);

uploadBtn.addEventListener('click', () => {
  if (!ufile) return;
  handleUpload();
})