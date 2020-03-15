// Animal class in ES5

// function Animal (name, energy) {
//   this.name = name
//   this.energy = energy
// }

// Animal.prototype.eat = function (amount) {
//   console.log(`${this.name} is eating.`)
//   this.energy += amount
// }

// Animal.prototype.sleep = function (length) {
//   console.log(`${this.name} is sleeping.`)
//   this.energy += length
// }

// Animal.prototype.play = function (length) {
//   console.log(`${this.name} is playing.`)
//   this.energy -= length
// }

// const lion = new Animal('Lion', 7)

// Animal class in ES6

// class Animal {
//   constructor(name, energy) {
//     this.name = name
//     this.energy = energy
//   }
//   eat(amount) {
//     console.log(`${this.name} is eating.`)
//     this.energy += amount
//   }
//   sleep() {
//     console.log(`${this.name} is sleeping.`)
//     this.energy += length
//   }
//   play() {
//     console.log(`${this.name} is playing.`)
//     this.energy -= length
//   }
// }

// const lion = new Animal('Lion', 7)

/*
 ** What if we wanted to make individual classes for specific animals
 */

// function Dog (name, energy, breed) {
//   this.name = name
//   this.energy = energy
//   this.breed = breed
// }

// Dog.prototype.eat = function (amount) {
//   console.log(`${this.name} is eating.`)
//   this.energy += amount
// }

// Dog.prototype.sleep = function (length) {
//   console.log(`${this.name} is sleeping.`)
//   this.energy += length
// }

// Dog.prototype.play = function (length) {
//   console.log(`${this.name} is playing.`)
//   this.energy -= length
// }

// Dog.prototype.bark = function () {
//   console.log('Woof-Woof!')
//   this.energy -= .1
// }

// const fin = new Dog('Fin', 5, 'Labradoodle')

// We might want to a cat class as well as each type of animal we
// want to create

// The Animal is the perfect base class

// function Animal(name, energy) {
//   this.name = name;
//   this.energy = energy;
// }

// Animal.prototype.eat = function(amount) {
//   console.log(`${this.name} is eating.`);
//   this.energy += amount;
// };

// Animal.prototype.sleep = function(length) {
//   console.log(`${this.name} is sleeping.`);
//   this.energy += length;
// };

// Animal.prototype.play = function(length) {
//   console.log(`${this.name} is playing.`);
//   this.energy -= length;
// };

// function Dog(name, energy, breed) {
//   Animal.call(this, name, energy);
//   // Add a breed property
//   this.breed = breed;
// }

// const fin = new Dog('Fin', 5, 'Labradoodle');
// fin.eat;

// Ok, so now we want to be able to access properties of Animal
// and access the methods on Animal.prototype
// Let's use Object.create

// function Animal(name, energy) {
//   this.name = name;
//   this.energy = energy;
// }

// Animal.prototype.eat = function(amount) {
//   console.log(`${this.name} is eating.`);
//   this.energy += amount;
// };

// Animal.prototype.sleep = function(length) {
//   console.log(`${this.name} is sleeping.`);
//   this.energy += length;
// };

// Animal.prototype.play = function(length) {
//   console.log(`${this.name} is playing.`);
//   this.energy -= length;
// };

// function Dog(name, energy, breed) {
//   Animal.call(this, name, energy);

//   this.breed = breed;
// }

// Dog.prototype = Object.create(Animal.prototype);

// const fin = new Dog('Fin', 5, 'Labradoodle');
// fin.eat(5);

/*
1) JavaScript checks if charlie has an eat property - it doesn't.
2) JavaScript then checks if Dog.prototype has an eat property
    - it doesn't.
3) JavaScript then checks if Animal.prototype has an eat property
    - it does so it calls it.
*/

// function Animal (name, energy) {
//   this.name = name
//   this.energy = energy
// }

// Animal.prototype.eat = function (amount) {
//   console.log(`${this.name} is eating.`)
//   this.energy += amount
// }

// Animal.prototype.sleep = function (length) {
//   console.log(`${this.name} is sleeping.`)
//   this.energy += length
// }

// Animal.prototype.play = function (length) {
//   console.log(`${this.name} is playing.`)
//   this.energy -= length
// }

// function Dog (name, energy, breed) {
//   Animal.call(this, name, energy)

//   this.breed = breed
// }

// Dog.prototype = Object.create(Animal.prototype)

// Dog.prototype.bark = function () {
//   console.log('Woof Woof!')
//   this.energy -= .1
// }

// const fin = new Dog('Fin', 5, 'Labradoodle')
// console.log(fin.constructor)

// any instances of Dog which log instance.constructor
// are going to get the Animal constructor rather than the Dog constructor.

// Let's fix this by adding the correct constructor property to
// Dog.prototype once we override it

// function Dog (name, energy, breed) {
//   Animal.call(this, name, energy)

//   this.breed = breed
// }

// Dog.prototype = Object.create(Animal.prototype)

// Dog.prototype.bark = function () {
//   console.log('Woof Woof!')
//   this.energy -= .1
// }

// Dog.prototype.constructor = Dog,

// /*
// ** If we made another subclass, say Cat, we'd follow the same pattern
// */

// function Cat (name, energy, declawed) {
//   Animal.call(this, name, energy)

//   this.declawed = declawed
// }

// Cat.prototype = Object.create(Animal.prototype)
// Cat.prototype.constructor = Cat

// Cat.prototype.meow = function () {
//   console.log('Meow!')
//   this.energy -= .1
// }

/*
 ** This concept of a base class with subclasses that delegate to the
 ** base class, is called inheritance and is an OOP feature.
 */

// Before ES6 classes, inheritance in JS was quite the task
// Now we just need to know when to use inheritance, as well as
// a mix of .call, Object.create, this, and FN.prototype
// which are all pretty advanced JS topics

/*
 ** Ok, let's use ES6 classes
 */

class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  }
  sleep() {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  }
  play() {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
}

class Dog extends Animal {
  constructor(name, energy, breed) {
    // To access the base class, we invoke super
    super(name, energy); // calls Animal's constructor
    this.breed = breed;
  }
  bark() {
    console.log('Woof Woof!');
    this.energy -= 0.1;
  }
}

// the reason all instances of Array have access to
// the array methods like pop, slice, filter, etc
// are because all of those methods live on Array.prototype.

// console.log(Array.prototype)

/*
  concat: ƒn concat()
  constructor: ƒn Array()
  copyWithin: ƒn copyWithin()
  entries: ƒn entries()
  every: ƒn every()
  fill: ƒn fill()
  filter: ƒn filter()
  find: ƒn find()
  findIndex: ƒn findIndex()
  forEach: ƒn forEach()
  includes: ƒn includes()
  indexOf: ƒn indexOf()
  join: ƒn join()
  keys: ƒn keys()
  lastIndexOf: ƒn lastIndexOf()
  length: 0n
  map: ƒn map()
  pop: ƒn pop()
  push: ƒn push()
  reduce: ƒn reduce()
  reduceRight: ƒn reduceRight()
  reverse: ƒn reverse()
  shift: ƒn shift()
  slice: ƒn slice()
  some: ƒn some()
  sort: ƒn sort()
  splice: ƒn splice()
  toLocaleString: ƒn toLocaleString()
  toString: ƒn toString()
  unshift: ƒn unshift()
  values: ƒn values()
*/

// The reason all instances of Object have access to methods
// like hasOwnProperty and toString is because those methods
// live on Object.prototype

// console.log(Object.prototype)

/*
  constructor: ƒn Object()
  hasOwnProperty: ƒn hasOwnProperty()
  isPrototypeOf: ƒn isPrototypeOf()
  propertyIsEnumerable: ƒn propertyIsEnumerable()
  toLocaleString: ƒn toLocaleString()
  toString: ƒn toString()
  valueOf: ƒn valueOf()
*/

/*
 ** Given the following:
 */

const friends = ['Mikenzi', 'Jake', 'Ean'];
friends.hasOwnProperty('push'); // false

// Remember JS has two types, Primitive and Reference
// Primitive are Boolean, Number, String, null, undefined
// Everything else is a reference which extends Object.prototype
// This is WHY, we can add properties to functions and arrays
// and WHY both functions and arrays have access to the methods
// located on Object.prototype

function speak() {}
speak.woahFunctionsAreLikeObjects = true;
console.log(speak.woahFunctionsAreLikeObjects); // true

const friends = ['Mikenzi', 'Jake', 'Ean'];
friends.woahArraysAreLikeObjectsToo = true;
console.log(friends.woahArraysAreLikeObjectsToo); // true
