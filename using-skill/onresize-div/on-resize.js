/**
 * @date 2018/06/11
 * @auth NARUTOne
 */

function EleResize (ele) {
  this.ele = ele;
  if (document.attachEvent) {//ie9-10 
    this.on = function (handler, context) { 
      var handlers = this.ele.__z_resizeListeners; 
      if (!handlers) { 
        handlers = []; 
        this.ele.__z_resizeListeners = handlers; 
        this.ele.__resizeTrigger__ = this.ele; 
        this.ele.attachEvent('onresize', this._handleResize); 
      } 
      handlers.push({ 
        handler: handler, 
        context: context 
      }); 
    }; 
    this.off = function (handler, context) { 
      var handlers = this.ele.__z_resizeListeners; 
      if (handlers) { 
        this._removeHandler(this.ele, handler, context);
        if (handlers.length === 0) { 
          this.ele.detachEvent('onresize', this._handleResize); 
          delete this.ele.__z_resizeListeners; 
        } 
      } 
    } 
  } else { 
    this.on = function (handler, context) {
      var handlers = this.ele.__z_resizeListeners; 
      if (!handlers) { 
        handlers = []; 
        this.ele.__z_resizeListeners = handlers; 
        if (getComputedStyle(this.ele, null).position === 'static') { 
          this.ele.style.position = 'relative'; 
        } 
        var obj = this._createResizeTrigger(this.ele);
        this.ele.__resizeTrigger__ = obj; 
        obj.__resizeElement__ = this.ele; 
      } 
      handlers.push({ 
        handler: handler, 
        context: context 
      }); 
    }; 
    this.off = function (handler, context) { 
      var handlers = this.ele.__z_resizeListeners; 
      if (handlers) { 
        this._removeHandler(this.ele, handler, context); 
        if (handlers.length === 0) { 
          var trigger = this.ele.__resizeTrigger__; 
          if (trigger) { 
            trigger.contentDocument.defaultView.removeEventListener('resize', this._handleResize); 
            this.ele.removeChild(trigger); 
            delete this.ele.__resizeTrigger__; 
          } 
          delete this.ele.__z_resizeListeners; 
        } 
      } 
    } 
  }
}

EleResize.prototype = {
  constructor: EleResize,
  _handleResize: function (e) {
    console.log('_handleResize');
    var ele = e.target || e.srcElement;
    var trigger = ele.__resizeTrigger__;
    if(trigger) {
      var handlers = trigger.__z_resizeListeners;
      if (handlers) {
        // var size = handlers.length;
        for ( let item of handlers) {
          var handler = item.handler;
          var context = item.context;
          handler.apply(context, [e]);
        }
      }
    }
  },
  _removeHandler: function (ele, handler, context) {
    var handlers = ele.__z_resizeListeners;
    if(handlers) {
      for ( let i in handlers) {
        let item = handlers[i];
        if(item.handler === handler && item.context === context) {
          handlers.splice(i, 1);
          return;
        }
      }
    }
  },
  _createResizeTrigger: function (ele) {
    const _this = this;
    console.log('_createResizeTrigger');
    var obj = document.createElement('object'); 
    obj.setAttribute('style', 
      'display: block; position: absolute; top: 0; left: 0; height: 100%; width: 100%; overflow: hidden;opacity: 0; pointer-events: none; z-index: -1;'
    ); 
    obj.onload = function (evt) {
      console.log('_handleObjectLoad', this);
      this.contentDocument.defaultView.__resizeTrigger__ = this.__resizeElement__; 
      this.contentDocument.defaultView.addEventListener('resize', _this._handleResize); 
    }; 
    obj.type = 'text/html'; 
    ele.appendChild(obj); 
    obj.data = 'about:blank'; 
    return obj;
  }
}