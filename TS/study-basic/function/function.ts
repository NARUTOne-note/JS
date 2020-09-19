/**
 * function 函数
 */
// ! 参数类型和返回值类型
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };

// * 按上下文归类

let myAdd1: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };

// ! 传参
// * 可选参数 初始值 undefined, 默认值参数也为可选参数
function buildName(firstName: string, lastName = 'wu', sex?: string) { // lastName, wu, sex, undefined
  if (lastName)
      return firstName + " " + lastName;
  else
      return firstName;
}

let result1 = buildName("Bob");  // works correctly now
let result2 = buildName("Bob", "Adams", "Sr.");
let result3 = buildName("Bob", "Adams");  // ah, just right

// * 可选参数在前

function buildName2(firstName = "Will", lastName: string) {
  return firstName + " " + lastName;
}
let result4 = buildName2(undefined, "Adams");     // okay and returns "Will Adams", 必须明确的传入 undefined值来获得默认值

// ! 剩余参数 ...props [arguments]

function buildName3(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let employeeName = buildName3("Joseph", "Samuel", "Lucas", "MacKinzie");

// ! this

let deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  createCardPicker: function() {
      return function() { // () => {}
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker = deck.createCardPicker();
let pickedCard = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// * this参数
interface Card {
  suit: string;
  card: number;
}
interface Deck {
  suits: string[];
  cards: number[];
  createCardPicker(this: Deck): () => Card;
}
let deck2: Deck = {
  suits: ["hearts", "spades", "clubs", "diamonds"],
  cards: Array(52),
  // NOTE: The function now explicitly specifies that its callee must be of type Deck
  createCardPicker: function(this: Deck) {
      return () => {
          let pickedCard = Math.floor(Math.random() * 52);
          let pickedSuit = Math.floor(pickedCard / 13);

          return {suit: this.suits[pickedSuit], card: pickedCard % 13};
      }
  }
}

let cardPicker2 = deck.createCardPicker();
let pickedCard2 = cardPicker();

alert("card: " + pickedCard.card + " of " + pickedCard.suit);

// * this回调
interface UIElement {
  addClickListener(onclick: (this: void, e: Event) => void): void;
}

class Handler {
  info: string;
  onClickBad(this: Handler, e: Event) { // this: void
      // oops, used this here. using this callback would crash at runtime
      console.log(e, this.info);
  }
}
let h = new Handler();
// uiElement.addClickListener(h.onClickBad); // error!

// ! 重载
/* 为同一个函数提供多个函数类型定义来进行函数重载
? function pickCard(x): any并不是重载列表的一部分，
? 因此这里只有两个重载：一个是接收对象另一个接收数字。 以其它参数调用 pickCard会产生错误。
*/
type Combinable = string | number

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: number, b: string): string;
function add(a: string, b: number): string;
function add(a: Combinable, b: Combinable) {
  // type Combinable = string | number;
  if (typeof a === 'string' || typeof b === 'string') {
    return a.toString() + b.toString();
  }
  return a + b;
}


let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x: {suit: string; card: number; }[]): number;
function pickCard(x: number): {suit: string; card: number; };
function pickCard(x): any {
    // Check to see if we're working with an object/array
    // if so, they gave us the deck and we'll pick the card
    if (typeof x == "object") {
        let pickedCard = Math.floor(Math.random() * x.length);
        return pickedCard;
    }
    // Otherwise just let them pick the card
    else if (typeof x == "number") {
        let pickedSuit = Math.floor(x / 13);
        return { suit: suits[pickedSuit], card: x % 13 };
    }
}

let myDeck = [{ suit: "diamonds", card: 2 }, { suit: "spades", card: 10 }, { suit: "hearts", card: 4 }];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard3 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);

// let pickCardArray = pickCard(["dd"]); // error