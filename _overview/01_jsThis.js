/*
 ** Understanding the this keyword
 ** Source: https://tylermcginnis.com/this-keyword-call-apply-bind-javascript/
 ** Implicit
 ** Explicit
 ** new
 ** window
 */

/*
 ** Implicit Binding
 */

// Example 1 - Implicit Binding

// const user = {
//   name: "Mike",
//   age: 27,
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   }
// };

// user.greet();

// Example 2 - Implicit Binding

// const user = {
//   name: "Mike",
//   age: 41,
//   greet() {
//     console.log(`Hello, my name is ${this.name}`);
//   },
//   mother: {
//     name: "Julie",
//     greet() {
//       console.log(`Hello, my name is ${this.name}`);
//     }
//   }
// };

// user.greet();
// user.mother.greet();

/*
 ** Explicit Binding
 */

/*
 ** Example 1 - Explicit Binding
 */

// function greet() {
//   console.log(`Hello, my name is ${this.name}`);
// }

// const user = {
//   name: "Mike",
//   age: 41
// };

// greet.call(user);

/*
 ** Example 2 - Explicit Binding (Using Call)
 ** Pass arguments one by one after the first argument has been passed
 */

// function greet(l1, l2, l3) {
//   console.log(
//     `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
//   );
// }

// const user = {
//   name: "Mike",
//   age: 41
// };

// const languages = ["JavaScript", "Python", "C++"];

// greet.call(user, languages[0], languages[1], languages[2]);

/*
 ** Example 3 - Explicit Binding (Using Apply)
 ** Apply is like call.
 ** Instead of passing arguments, we pass a single array.
 */

// function greet(l1, l2, l3) {
//   console.log(
//     `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
//   );
// }

// const user = {
//   name: "Mike",
//   age: 41
// };

// const languages = ["JavaScript", "Python", "C++"];

// greet.apply(user, languages);

/*
 ** Example 3 - Explicit Binding (Using Bind)
 **
 */

// function greet(l1, l2, l3) {
//   console.log(
//     `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
//   );
// }

// const user = {
//   name: "Mike",
//   age: 41
// };

// const languages = ["JavaScript", "Python", "C++"];
// const newFn = greet.bind(user, languages[0], languages[1], languages[2]);

// newFn();

/*
 ** Example 4 - new Binding
 */

// function User(name, age) {
//   /*
//     Under the hood, JavaScript creates a new object called `this`
//     which delegates to the User's prototype on failed lookups. If a
//     function is called with the new keyword, then it's this new object
//     that interpretor created that the this keyword is referencing.
//   */

//   this.name = name;
//   this.age = age;
// }

// const me = new User("Mike", 41);
// console.log(me);

/*
 ** Example 5 - Lexical Binding
 ** Arrow functions and the this keyword
 ** Unlike normal functions, arrow functions do not have their own this.
 ** Instead, the this keyword is determined lexically
 ** The JS interpretor will look to the enclosing parent scope to determine
 ** what this is
 */

// const user = {
//   name: "Mike",
//   age: 41,
//   languages: ["JavaScript", "Python", "C++"],
//   greet() {
//     const hello = `Hello, my name is ${this.name} and I know`;
//     const langs = this.languages.reduce((str, lang, i) => {
//       if (i === this.languages.length - 1) {
//         return `${str} and ${lang}.`;
//       }
//       return `${str} ${lang},`;
//     }, "");
//     console.log(hello + langs);
//   }
// };

// user.greet();

/*
 ** Example 6 - Window Binding
 ** This is weird, this references the window object
 ** Really weird edge case, needs browser to work
 ** Use strict mode to prevent JS from defaulting to window object
 ** window.age = 41; // Otherwise sayAge() returns undefined
 */

// 'use strict';
// function sayAge() {
//   console.log(`My age is ${this.age}`);
// }

// const user = {
//   name: 'Mike',
//   age: 41
// };

// sayAge();
