/**
 * JS-string
 */

var str = 'hello';

str[1] // e
str.charAt(1) // e

// search(regexp), 搜索指定字符串，并返回第一个匹配项的位置

'hello'.search(/l/); // 2
'heLlo'.search(/l/); // 3

/**
 * replace
替换字符串中某个模式的匹配项，这个模式可以是字符串或正则
str.replace(regexp|substr, newSubStr|function)
*/

'hello456'.replace(/\D/, 0); // '0ello456'
'hello456'.replace(/\D/g, 0); // '00000456'

// split

"hellow".split(/[eo]/); // ["h", "ll", "w"]

// indexOf

'hello'.indexOf('e'); // 1

// concat

'hello'.concat('world'); // helloworld