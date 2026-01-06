// This is a coding exercise of implementing a parser. Some minor parsing capabilities are not implemented.
// The algorithm are mainly from Douglas Crockford's 'https://github.com/douglascrockford/JSON-js/blob/master/json_parse.js'

function json_parse(str) {
  var i = 0
  var ch = str[i]

  // core function that recursively called to move forward scanning pointers and accept tokens
  function next(c) {
    if (c) {
      if (str[i] == c) {
        i++
        ch = str[i]
        return true
      } else {
        throw new Error("Error in parsing. '" + c + "' is expected at " + i + ".");
      }
    } else {
      i++
      ch = str[i]
    }
  }

  // accepting functions for tokens in a single character
  function colon() {
    next(":")
  }

  function leftBrace() {
    next("{")
  }

  function rightBrace() {
    next("}")
  }

  function leftBracket() {
    next("[")
  }

  function rightBracket() {
    next("]")
  }

  function quote() {
    next("\"")
  }

  function comma() {
    next(",")
  }

  function dot() {
    next(".")
  }

  // accepting functions for tokens that are formed by constant character sequence
  function _null() {
    next("n")
    next("u")
    next("l")
    next("l")
  }

  function _true() {
    next("t")
    next("r")
    next("u")
    next("e")
  }

  function _false() {
    next("f")
    next("a")
    next("l")
    next("s")
    next("e")
  }

  // accepting functions for tokens where multiple characters could appear on the same position
  function sign() {
    if (ch && ch == "+") {
      next()
      return 1
    } else if (ch && ch == "-") {
      next()
      return -1
    }
    return 1
  }

  function expo() {
    if (ch && (ch == "e" || ch == "E")) {
      next()
      return 1
    }
    return 0
  }

  function word() {
    var parsed = ''
    while (ch && ch != "\"") {
      parsed += ch
      next()
    }
    return parsed
  }

  function digitSequence() {
    var seq = ''
    while(ch && /[0-9]/.test(ch)) {
      seq += ch
      next()
    }
    return parseInt(seq)
  }

  function number() {
    var parsed = 0
    var s = sign()
    var integer, fractional, exponential
    integer = digitSequence()
    if (ch && ch == ".") {
      dot()
      fractional = digitSequence()
    }
    var hasExpo = expo()
    if (hasExpo) {
      exponential = digitSequence()
    } else {
      exponential = 0
    }
    parsed = integer
    if (fractional) {
      parsed += fractional / Math.pow(10, fractional.toString().length)
    }
    if (exponential) {
      parsed = parsed * Math.pow(10, exponential)
    }
    if (s == -1) {
      parsed = -parsed
    }
    return parsed
  }

  function whitespace() {
    while(ch && /\s/.test(ch)) {
      next()
    }
  }

  // accepting functions for some sub structures
  function wordConstant() {
    var result
    if (ch && ch == 't') {
      _true()
      result = true
    } else if (ch && ch == 'f') {
      _false()
      result = false
    } else if (ch && ch == 'n') {
      _null()
      result = null
    }
    return result
  }

  function string() {
    quote()
    var parsed = word()
    quote()
    return parsed
  }

  function keyValue() {
    var result = []
    result[0] = string()
    whitespace()
    colon()
    whitespace()
    result[1] = element()
    return result
  }

  function keyValues() {
    var parsed = {}
    while (ch && ch == '"') {
      var kv = keyValue()
      parsed[kv[0]] = kv[1]
      whitespace()
      if (ch && ch == ",") {
        comma()
      } else {
        break
      }
      whitespace()
    }
    return parsed
  }

  function element() {
    if (ch && ch == '"') {
      return string()
    } else if (ch && ch == "[") {
      return array()
    } else if (ch && ch == "{") {
      return object()
    } else if (ch && /[\+\-0-9]/.test(ch)) {
      return number()
    } else if (ch && /[tfn]/.test(ch)) {
      return wordConstant()
    } else {
      if (ch) {
        throw new Error("Error in parsing. '" + ch + "' is invalid as an element in array at " + i + ".")
      }
    }
  }

  function elements() {
    var ele = []
    while(ch && /[\"\[\{\+\-0-9tfn]/.test(ch)) {
      var e = element()
      ele.push(e)
      whitespace()
      if (ch && ch == ",") {
        comma()
      } else {
        break
      }
      whitespace()
    }
    return ele
  }

  function array() {
    leftBracket()
    whitespace()
    var ele = elements()
    whitespace()
    rightBracket()
    return ele
  }

  function object() {
    leftBrace()
    whitespace()
    var kvs = keyValues()
    whitespace()
    rightBrace()
    return kvs
  }

  whitespace()
  var result = element()
  whitespace()
  return result
}