## Welcome to requireJS

- [RequireJS - 入门指南、进阶使用详解](http://www.hangge.com/blog/cache/detail_1702.html)
- [requireJS](http://requirejs.org/)


## 配置示例
```
require.config({
    baseUrl: 'js',
    paths: {
        jquery: 'lib/jquery-1.11.1'
    },
    shim: {
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        'modal':{//模态框插件不是模块化
            deps:['jquery'],
            export:"modal"
        },
    },
    map: {
        'script/newmodule': {
            'foo': 'foo1.2'
        },
        'script/oldmodule': {
            'foo': 'foo1.0'
        }
    },
    config: {
        'script/bar': {
            size: 'large'
        },
        'script/baz': {
            color: 'blue'
        }
    }
});
```