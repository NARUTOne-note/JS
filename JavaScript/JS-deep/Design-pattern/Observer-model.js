/**
 * 观察者模式
 */

var Observer = {
  obs: {},
  listen: function(key, fn) {
		var stack, _ref;
		stack = (_ref = this.obs[key]) != null ? _ref : this.obs[key] = [];
		return stack.push(fn);
  },
  trigger: function() {
		var fn, stack, _i, _len, _ref, key;

		key = Array.prototype.shift.call(arguments);
		stack = (_ref = this.obs[key]) != null ? _ref : this.obs[key] = [];

		for(_i = 0, _len = stack.length; _i < _len; _i++) {
			fn = stack[_i];
      return fn.apply(this, arguments);
		}
	}
}

Observer.listen('render', function(res) {
  console.log(res);
})

setTimeout(() => {
  Observer.trigger('render', 'hello word !');
}, 1000);