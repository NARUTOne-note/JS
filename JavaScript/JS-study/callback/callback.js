/**
 *CallBack (以下代码实例为nodeJS环境下)
 * 
 * createDate: 2017/07/20
 * 
 * author: NARUTOne *
 *
 */

//callback hell
//Callback Hell 就是异步回调函数过多的嵌套，导致的代码可读性下降以及出错率提高的问题

fs.readdir(source, function (err, files) {
  if (err) {
    console.log('Error finding files: ' + err)
  } else {
    files.forEach(function (filename, fileIndex) {
      console.log(filename)
      gm(source + filename).size(function (err, values) {
        if (err) {
          console.log('Error identifying file size: ' + err)
        } else {
          console.log(filename + ' : ' + values)
          aspect = (values.width / values.height)
          widths.forEach(function (width, widthIndex) {
            height = Math.round(width / aspect)
            console.log('resizing ' + filename + 'to ' + height + 'x' + height)
            this.resize(width, height).write(dest + 'w' + width + '_' + filename, function(err) {
              if (err) console.log('Error writing file: ' + err)
            })
          }.bind(this))
        }
      })
    })
  }
})

//releasing Zalgo:  就是我们的代码之中的callback,可能sync，也可能async触发

function register(options, callback) {
    var first_name = (options['first_name'] || '').trim();
    var last_name = (options['last_name'] || '').trim();
    var errors = [];

    if (!first_name) {
        errors.push(['first_name', 'Please enter a valid name']);
    }
    if (!last_name) {
        errors.push(['last_name', 'Please enter a valid name']);
    }
    if (errors.length) {
        return callback(null, errors);
        //改进
				//if (errors.length) {
				//process.nextTick(function() {
				//  callback(null, errors);
				//});
				//return;
				//}
    }

    var params = {
        'user': {
            'email': options['email'],
            'first_name': first_name,
            'last_name': last_name,
            'new_password': options['new_password'],
            'new_password_confirmation': options['new_password_confirmation'],
            'terms': '1'
        },
        'vrid': options['vrid'],
        'merge_history': options['merge_history'] || 'true'
    };

    requestWithSignature('post', '/api/v2/users', params, callback);
}



