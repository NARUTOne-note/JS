/*
 this
 * */

var color = 'red';
var o = {color: 'blue'};

function getColor() {
	console.log(this.color);
}

getColor(); // red

o.getColor = getColor;
o.getColor() // blue

// apply 、 call

getColor.call(this); // red
getColor.call(o); // blue



str = 'asda';

function foo() {
	age = 12;
	this.name = 'wz'
}

function Thing() {
	this.name = 'wz'
}
Thing.prototype.foo = "bar";
Thing.prototype.logFoo = function () {
    console.log(this.foo);
}
Thing.prototype.setFoo = function (newFoo) {
    this.foo = newFoo;
}
Thing.prototype.deleteFoo = function () {
    delete this.foo;
}

var thing = new Thing();
thing.setFoo("foo");
thing.logFoo(); // "foo";
thing.deleteFoo();
thing.logFoo(); // "bar";
thing.foo = "foobar";
thing.logFoo(); // "foobar";
delete thing.foo;
thing.logFoo(); // "bar";


