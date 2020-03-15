# Imperative vs Declarative Programming

## Imperative is HOW

### Example 1

```
function double (arr) {
  let results = []
  for (let i = 0; i < arr.length; i++){
    results.push(arr[i] * 2)
  }
  return results
}
```

### Example 2

```

function add (arr) {
  let result = 0
  for (let i = 0; i < arr.length; i++){
    result += arr[i]
  }
  return result
}
```

### Example 3

```

$("#btn").click(function() {
  $(this).toggleClass("highlight")
  $(this).text() === 'Add Highlight'
    ? $(this).text('Remove Highlight')
    : $(this).text('Add Highlight')
})
```

## Declarative is WHAT

Functional programming is subset of declarative. Start with .map, .reduce, and .filter and work your way up from there.

### Example 1

```

function double (arr) {
  return arr.map((item) => item * 2)
}
```

### Example 2

```

function add (arr) {
  return arr.reduce((prev, current) => prev + current, 0)
}
```

### Example 3

```

<Btn
  onToggleHighlight={this.handleToggleHighlight}
  highlight={this.state.highlight}>
    {this.state.buttonText}
</Btn>
```

# Understanding the this keyword in Javascript

- Implicit
- Explicit
- new
- window

## Implicit Binding

### Example 1 - Implicit Binding

```
const user = {
  name: "Mike",
  age: 27,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  }
};

user.greet();
```

### Example 2 - Implicit Binding

```
const user = {
  name: "Mike",
  age: 41,
  greet() {
    console.log(`Hello, my name is ${this.name}`);
  },
  mother: {
    name: "Julie",
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    }
  }
};

user.greet();
user.mother.greet();
```

## Explicit Binding

### Example 1 - Explicit Binding

```
function greet() {
  console.log(`Hello, my name is ${this.name}`);
}

const user = {
  name: "Mike",
  age: 41
};

greet.call(user);
```

### Example 2 - Explicit Binding (Using Call)

- Pass arguments one by one after the first argument has been passed

```
function greet(l1, l2, l3) {
  console.log(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  );
}

const user = {
  name: "Mike",
  age: 41
};

const languages = ["JavaScript", "Python", "C++"];

greet.call(user, languages[0], languages[1], languages[2]);
```

### Example 3 - Explicit Binding (Using Apply)

- Apply is like call. Instead of passing arguments, we pass a single array.

```
function greet(l1, l2, l3) {
  console.log(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  );
}

const user = {
  name: "Mike",
  age: 41
};

const languages = ["JavaScript", "Python", "C++"];

greet.apply(user, languages);
```

### Example 4 - Explicit Binding (Using Bind)

```
function greet(l1, l2, l3) {
  console.log(
    `Hello, my name is ${this.name} and I know ${l1}, ${l2}, and ${l3}`
  );
}

const user = {
  name: "Mike",
  age: 41
};

const languages = ["JavaScript", "Python", "C++"];
const newFn = greet.bind(user, languages[0], languages[1], languages[2]);

newFn();
```

### Example 5 - new Binding

    Under the hood, JavaScript creates a new object called `this`
    which delegates to the User's prototype on failed lookups. If a
    function is called with the new keyword, then it's this new object
    that interpretor created that the this keyword is referencing.

```
  this.name = name;
  this.age = age;
}

const me = new User("Mike", 41);
console.log(me);
```

### Example 6 - Lexical Binding

#### Arrow functions and the this keyword

Unlike normal functions, arrow functions do not have their own this. Instead, the this keyword is determined lexically. The JS interpreter will look to the enclosing parent scope to determine what this is.

```
const user = {
  name: "Mike",
  age: 41,
  languages: ["JavaScript", "Python", "C++"],
  greet() {
    const hello = `Hello, my name is ${this.name} and I know`;
    const langs = this.languages.reduce((str, lang, i) => {
      if (i === this.languages.length - 1) {
        return `${str} and ${lang}.`;
      }
      return `${str} ${lang},`;
    }, "");
    console.log(hello + langs);
  }
};

user.greet();
```

### Example 7 - Window Binding

This is weird, this references the window object. Really weird edge case, needs browser to work. Use strict mode to prevent JS from defaulting to window object
`window.age = 41; // Otherwise sayAge() returns undefined`

```
'use strict';
function sayAge() {
  console.log(`My age is ${this.age}`);
}

const user = {
  name: 'Mike',
  age: 41
};

sayAge();
```

# A guide to the Javascript prototype

## Function creates object, pass some props

```
function Animal(name, energy) {
  let animal = {};
  animal.name = name;
  animal.energy = energy;

  animal.eat = function(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  };

  animal.sleep = function(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  };

  animal.play = function(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  };

  return animal;
}

const lion = Animal('Lion', 7);
const tiger = Animal('Tiger', 10);
```

## Functional Instantiation with Shared Methods

```
const animalMethods = {
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  },
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  },
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
};

function Animal(name, energy) {
  let animal = Object.create(animalMethods);
  animal.name = name;
  animal.energy = energy;

  return animal;
}

const lion = Animal('Lion', 7);
const tiger = Animal('Tiger', 10);
lion.play;
```

#### Prototypal Instantiation

Prototype is a property on a function that points to an object. Prototype is just a property that every function in JS has. Prototype sharing methods across all instances of a function. In this example, the instances are lion, tiger and elephant.

### Constructor function

```
function Animal(name, energy) {
  /*
   **   Delegate failed lookup to the functions prototype
   **   This line is important because it creates the object
   **   to delegate to the prototype on failed lookups
   */
  let animal = Object.create(Animal.prototype);
  animal.name = name;
  animal.energy = energy;

  //  This returns the object we created
  return animal;
}

/*
 ** Add methods to the constructor functions prototype
 ** Because of object.create, these methods are shared
 */
Animal.prototype.eat = function(amount) {
  console.log(`${this.name} is eating.`);
  this.energy += amount;
};

Animal.prototype.sleep = function(length) {
  console.log(`${this.name} is sleeping.`);
  this.energy += length;
};

Animal.prototype.play = function(length) {
  console.log(`${this.name} is playing.`);
  this.energy -= length;
};

const lion = Animal('Lion', 7);
const tiger = Animal('Tiger', 10);

lion.eat(10);
tiger.play(5);

/*
 ** Using the 'new' keyword
 ** Using new keyword in front of a function invocation
 ** JS will automatically (eg. implicitly)
 ** perform Object.create and return and it will name the object 'this'
 */
const elephant = new Animal('Elephant', 100);

elephant.sleep(5);
```

### Constructor function with the 'new' keyword

This is kind of like a crappy version of a class. In other words a class is like a function that returns an object and you can create different instances of that class.

```
function AnimalWithNew(name, energy) {
  this.name = name;
  this.energy = energy;

  AnimalWithNew.prototype.eat = function(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  };

  AnimalWithNew.prototype.sleep = function(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  };

  AnimalWithNew.prototype.play = function(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  };
}

const lion = new AnimalWithNew('Lion', 7);
const tiger = new AnimalWithNew('Tiger', 10);
const elephant = new AnimalWithNew('Elephant', 100);

lion.play(7);
tiger.eat(1);
elephant.sleep(4);
```

### Now the same function but with ES6 and we get a class keyword which is just syntactical sugar.

```
class Animal {
  constructor(name, energy) {
    this.name = name;
    this.energy = energy;
  }
  eat(amount) {
    console.log(`${this.name} is eating.`);
    this.energy += amount;
  }
  sleep(length) {
    console.log(`${this.name} is sleeping.`);
    this.energy += length;
  }
  play(length) {
    console.log(`${this.name} is playing.`);
    this.energy -= length;
  }
}

const lion = new Animal('Lion', 7);
const tiger = new Animal('Tiger', 10);
const elephant = new Animal('Elephant', 100);

lion.play(7);
tiger.eat(1);
elephant.sleep(4);
```

### Some basic "good to know" info about JS prototype

```
const friends = []
/*
** is really just syntactical sugar
** to create this
*/
const friendsWithoutSugar = new Array()
```

### How do we know that every instances of an array have all those methods, slice, pop, push, etc.?

So really this shows that because we are using the 'new' keyword, that the 'const friends' will now have access to the methods that live on arrays prototype.

```
/*
** If we want to lookup the prototype of an object
** use the following
*/
const prototype = Object.getPrototypeOf(obj)
```

### How can we loop over each item in the obj?

```
for (let key in lion) {
  console.log(`Key: ${key}. Value: ${lion[key]}`);
}
```

Answer: By using a 'for in' loop. A 'for in' loops over all the enumerable properties
on both the object itself as well as the prototype that it delegates to
Because by default any property you add to the functions prototype
is enumerable, we see not only the properties the object, but in addition,
we also see all the methods on the prototype that the object delegates to

### We can use 'hasOwnProperty' to determine where the property lives

```
for (let key in lion) {
  if (lion.hasOwnProperty(key)) {
    console.log(`Key: ${key}. Value: ${lion[key]}`);
  }
}

```

### How to check if an object is a specific instance of a class?

- We can use 'instanceof'
- Arrow functions DO NOT have their own 'this' keyword
- Arrow functions CAN NOT be constructor functions

```
const Animal = () => {};
const lion = new Animal();
```

☝️ `Animal` is not a constructor.

###### Cannot use new keyword on an arrow function!

###### Arrow functions do not have a prototype property

# Private and Public Class Fields in JS

```
class Player {
  constructor() {
    this.points = 0
    this.assists = 0
    this.rebounds = 0
    this.steals = 0
  }
  addPoints(amount) {
    this.points += amount
  }
  addAssist() {
    this.assists++
  }
  addRebound() {
    this.rebounds++
  }
  addSteal() {
    this.steals++
  }
}
```

- We want to make ☝️ this more intuitive
- The TC39 Proposal gives us this 👇

```
class Player {
  points = 0
  assists = 0
  rebounds = 0
  steals = 0
  addPoints(amount) {
    this.points += amount
  }
  addAssist() {
    this.assists++
  }
  addRebound() {
    this.rebounds++
  }
  addSteal() {
    this.steals++
  }
}
```

- This is useful in React components 👇

```
class PlayerInput extends Component {
  constructor(props) {
    super(props)
    // We can remove this 👇
    // this.state = {
    //   username: ''
    // }

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}

PlayerInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

PlayerInput.defaultProps = {
  label: 'Username',
}
```

- We can also move propTypes and defaultProps in to the class! 🚀

```
class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username'
  }
  state = {
    username: ''
  }
  constructor(props) {
    super(props)

    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(event) {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}
```

Now we can remove the constructor function and the super invocation. We know that the 'this' keyword on arrow functions is lexically scoped and if we swap 'handleChange' for an arrow function, we are able to eliminate the bind issue because of the way the arrow function binds 'this' lexically.

```
class PlayerInput extends Component {
  static propTypes = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
  }
  static defaultProps = {
    label: 'Username'
  }
  state = {
    username: ''
  }
  handleChange = (event) => {
    this.setState({
      username: event.target.value
    })
  }
  render() {
    ...
  }
}
```

What to consider about class fields is performance with a constructor function because the object is defined once and shared across all instances of the class. Since class fields are added to the instance, for each
instance that is created, a new object method is created. The question should be, does the DX gained from class fields outweigh the potential performance hit.

To use the class fields the following plugin is needed:
`babel-plugin-transform-class-properties`

Also in JS, historically, there has been the lack of a private values, and historically we have marked them with an underscore.

###### For Example:

```
class Car {
  _milesDriven = 0
  drive(distance) {
    this._milesDriven += distance
  }
  getMilesDriven() {
    return this._milesDriven
  }
}
```

- In this case, we have a visual representation of the private value `_milesDriven`, but really any instance can access it.
- For the TC39 proposal, we can create a private value with the # (octothrope).

```

class Car {
  #milesDriven = 0
  drive(distance) {
    #milesDriven += distance
  }
  getMilesDriven() {
    return #milesDriven
  }
}

const tesla = new Car()
tesla.drive(10)
tesla.getMilesDriven() // 10
tesla.#milesDriven // Invalid
```

[TC39 Proposal](https://github.com/tc39/proposal-private-fields/blob/master/FAQ.md)

# Javascript Inheritance and the Prototype Chain [WIP]

// Animal class in ES5

// function Animal (name, energy) {
// this.name = name
// this.energy = energy
// }

// Animal.prototype.eat = function (amount) {
// console.log(`${this.name} is eating.`)
// this.energy += amount
// }

// Animal.prototype.sleep = function (length) {
// console.log(`${this.name} is sleeping.`)
// this.energy += length
// }

// Animal.prototype.play = function (length) {
// console.log(`${this.name} is playing.`)
// this.energy -= length
// }

// const lion = new Animal('Lion', 7)

// Animal class in ES6

// class Animal {
// constructor(name, energy) {
// this.name = name
// this.energy = energy
// }
// eat(amount) {
// console.log(`${this.name} is eating.`)
// this.energy += amount
// }
// sleep() {
// console.log(`${this.name} is sleeping.`)
// this.energy += length
// }
// play() {
// console.log(`${this.name} is playing.`)
// this.energy -= length
// }
// }

// const lion = new Animal('Lion', 7)

/_
\*\* What if we wanted to make individual classes for specific animals
_/

// function Dog (name, energy, breed) {
// this.name = name
// this.energy = energy
// this.breed = breed
// }

// Dog.prototype.eat = function (amount) {
// console.log(`${this.name} is eating.`)
// this.energy += amount
// }

// Dog.prototype.sleep = function (length) {
// console.log(`${this.name} is sleeping.`)
// this.energy += length
// }

// Dog.prototype.play = function (length) {
// console.log(`${this.name} is playing.`)
// this.energy -= length
// }

// Dog.prototype.bark = function () {
// console.log('Woof-Woof!')
// this.energy -= .1
// }

// const fin = new Dog('Fin', 5, 'Labradoodle')

// We might want to a cat class as well as each type of animal we
// want to create

// The Animal is the perfect base class

// function Animal(name, energy) {
// this.name = name;
// this.energy = energy;
// }

// Animal.prototype.eat = function(amount) {
// console.log(`${this.name} is eating.`);
// this.energy += amount;
// };

// Animal.prototype.sleep = function(length) {
// console.log(`${this.name} is sleeping.`);
// this.energy += length;
// };

// Animal.prototype.play = function(length) {
// console.log(`${this.name} is playing.`);
// this.energy -= length;
// };

// function Dog(name, energy, breed) {
// Animal.call(this, name, energy);
// // Add a breed property
// this.breed = breed;
// }

// const fin = new Dog('Fin', 5, 'Labradoodle');
// fin.eat;

// Ok, so now we want to be able to access properties of Animal
// and access the methods on Animal.prototype
// Let's use Object.create

// function Animal(name, energy) {
// this.name = name;
// this.energy = energy;
// }

// Animal.prototype.eat = function(amount) {
// console.log(`${this.name} is eating.`);
// this.energy += amount;
// };

// Animal.prototype.sleep = function(length) {
// console.log(`${this.name} is sleeping.`);
// this.energy += length;
// };

// Animal.prototype.play = function(length) {
// console.log(`${this.name} is playing.`);
// this.energy -= length;
// };

// function Dog(name, energy, breed) {
// Animal.call(this, name, energy);

// this.breed = breed;
// }

// Dog.prototype = Object.create(Animal.prototype);

// const fin = new Dog('Fin', 5, 'Labradoodle');
// fin.eat(5);

/\*

1. JavaScript checks if charlie has an eat property - it doesn't.
2. JavaScript then checks if Dog.prototype has an eat property
   - it doesn't.
3. JavaScript then checks if Animal.prototype has an eat property - it does so it calls it.
   \*/

// function Animal (name, energy) {
// this.name = name
// this.energy = energy
// }

// Animal.prototype.eat = function (amount) {
// console.log(`${this.name} is eating.`)
// this.energy += amount
// }

// Animal.prototype.sleep = function (length) {
// console.log(`${this.name} is sleeping.`)
// this.energy += length
// }

// Animal.prototype.play = function (length) {
// console.log(`${this.name} is playing.`)
// this.energy -= length
// }

// function Dog (name, energy, breed) {
// Animal.call(this, name, energy)

// this.breed = breed
// }

// Dog.prototype = Object.create(Animal.prototype)

// Dog.prototype.bark = function () {
// console.log('Woof Woof!')
// this.energy -= .1
// }

// const fin = new Dog('Fin', 5, 'Labradoodle')
// console.log(fin.constructor)

// any instances of Dog which log instance.constructor
// are going to get the Animal constructor rather than the Dog constructor.

// Let's fix this by adding the correct constructor property to
// Dog.prototype once we override it

// function Dog (name, energy, breed) {
// Animal.call(this, name, energy)

// this.breed = breed
// }

// Dog.prototype = Object.create(Animal.prototype)

// Dog.prototype.bark = function () {
// console.log('Woof Woof!')
// this.energy -= .1
// }

// Dog.prototype.constructor = Dog,

// /_
// \*\* If we made another subclass, say Cat, we'd follow the same pattern
// _/

// function Cat (name, energy, declawed) {
// Animal.call(this, name, energy)

// this.declawed = declawed
// }

// Cat.prototype = Object.create(Animal.prototype)
// Cat.prototype.constructor = Cat

// Cat.prototype.meow = function () {
// console.log('Meow!')
// this.energy -= .1
// }

/_
** This concept of a base class with subclasses that delegate to the
** base class, is called inheritance and is an OOP feature.
_/

// Before ES6 classes, inheritance in JS was quite the task
// Now we just need to know when to use inheritance, as well as
// a mix of .call, Object.create, this, and FN.prototype
// which are all pretty advanced JS topics

/_
\*\* Ok, let's use ES6 classes
_/

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

/_
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
_/

// The reason all instances of Object have access to methods
// like hasOwnProperty and toString is because those methods
// live on Object.prototype

// console.log(Object.prototype)

/_
constructor: ƒn Object()
hasOwnProperty: ƒn hasOwnProperty()
isPrototypeOf: ƒn isPrototypeOf()
propertyIsEnumerable: ƒn propertyIsEnumerable()
toLocaleString: ƒn toLocaleString()
toString: ƒn toString()
valueOf: ƒn valueOf()
_/

/_
\*\* Given the following:
_/

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

# Javascript Composition and Inheritance [WIP]

/_
** Is this example we have abstracted the common features
** of each Animal(name, energy, eat, sleep, play) to the Animal
** base class. Then for each individual type of animal (Dog, Cat)
** we created a subclass for each.
_/

// class Animal {
// constructor(name, energy) {
// this.name = name;
// this.energy = energy;
// }
// eat(amount) {
// console.log(`${this.name} is eating.`);
// this.energy += amount;
// }
// sleep() {
// console.log(`${this.name} is sleeping.`);
// this.energy += length;
// }
// play() {
// console.log(`${this.name} is playing.`);
// this.energy -= length;
// }
// }

// class Dog extends Animal {
// constructor(name, energy, breed) {
// super(name, energy);

// this.breed = breed;
// }
// bark() {
// console.log('Woof Woof!');
// this.energy -= 0.1;
// }
// }

// class Cat extends Animal {
// constructor(name, energy, declawed) {
// super(name, energy);

// this.declawed = declawed;
// }
// meow() {
// console.log('Meow!');
// this.energy -= 0.1;
// }
// }

/_
\*\* Without code this is visualized as follows
_/

// Animal
// name
// energy
// eat()
// sleep()
// play()

// Dog
// breed
// bark()

// Cat
// declawed
// meow()

/_
** We can take this a step further and add a User class
** This is a good example of classes and inheritance
_/

// User
// email
// username
// pets
// friends
// adopt()
// befriend()

// Animal
// name
// energy
// eat()
// sleep()
// play()

// Dog
// breed
// bark()

// Cat
// declawed
// meow()

/_
** Let's say that we have one class has some properties that
** we now want another class to also have.
** We could abstract the common properties to another parent class
** and then add one more step of inheritance.
_/

// Like this

// GodObject;
// name;
// play();
// sleep();
// eat();

// User;
// email;
// username;
// pets;
// friends;
// adopt();
// befriend();

// Animal;
// energy;

// Dog;
// breed;
// bark();

// Cat;
// declawed;
// meow();

/_
** This works but A) it's fragile and B) it's an anti-pattern
** AKA God-Object https://en.wikipedia.org/wiki/God_object
_/

/_
** Now we are dealing with the problem with inheritance.
** In the future, what User IS could change and if/when
\*\* it does, the tightly coupled inheritance structure will crumble.
_/

/_
** So, instead of thinking about what things ARE, let's
** think about what things DO
_/

// const eater = () => ({})
// const sleeper = () => ({})
// const player = () => ({})
// const barker = () => ({})
// const meower = () => ({})
// const adopter = () => ({})
// const friender = () => ({})

/_
** Instead of having these methods defined (and coupled) to
** a particular class, we can abstract them into their own
\*\* functions and compose them together with any type that needs them.
_/

const sleeper = state => ({
sleep(length) {
console.log(`${state.name} is sleeping.`);
state.energy += length;
}
});

const player = state => ({
play() {
console.log(`${state.name} is playing.`);
state.energy -= length;
}
});

const barker = state => ({
bark() {
console.log('Woof Woof!');
state.energy -= 0.1;
}
});

const meower = state => ({
meow() {
console.log('Meow!');
state.energy -= 0.1;
}
});

const adopter = state => ({
adopt(pet) {
state.pets.push(pet);
}
});

const friender = state => ({
befriend(friend) {
state.friends.push(friend);
}
});

/_
** Now, whenever a Dog, Cat, or User needs to add the ability
** to do any of the functions, we can merge the object they get
\*\* from one of the functions onto their own object.
_/

// For example, we know Dog sleeps, eats, plays and barks.

// function Dog(name, energy, breed) {
// let dog = {
// name,
// energy,
// breed
// };

// return Object.assign(dog, eater(dog), sleeper(dog), player(dog), barker(dog));
// }

// const fin = Dog('Fin', 5, 'Labradoodle');
// fin.eat(10); // Fin is eating
// fin.bark(); // Woof Woof!

// We know Cat sleeps, eats, plays, and meows

// function Cat(name, energy, declawed) {
// let cat = {
// name,
// energy,
// declawed
// };

// return Object.assign(cat, eater(cat), sleeper(cat), player(cat), meower(cat));
// }

/_
** Now, based on this de-coupling, we can add some of the
** methods previously only available to Animal, to User.Animal
\*\* We can let the User sleep, eat, and play
_/

function User(email, username) {
let user = {
email,
username,
pets: [],
friends: []
};

return Object.assign(
user,
eater(user),
sleeper(user),
player(user),
adopter(user),
friender(user)
);
}

/_
** To take this one step further, we could give Dogs
** the ability to add friends, previously only a method
\*\* a User could do.
_/

function Dog(name, energy, breed) {
let dog = {
name,
energy,
breed,
friends: []
};

return Object.assign(
dog,
eater(dog),
sleeper(dog),
player(dog),
barker(dog),
friender(dog)
);
}

const fin = Dog('Fin', 5, 'Labradoodle');
fin.eat(10); // Fin is eating
fin.bark(); // Woof Woof!

/_
** These ☝️ are the "Functional Instantiation" pattern.
** This is not involving the prototype at all.
** If we want to use this pattern with the 'new' keyword
** We could do the following
_/

function Cat(name, energy, declawed) {
this.name = name;
this.energy = energy;
this.declawed = declawed;

return Object.assign(
this,
eater(this),
sleeper(this),
player(this),
meower(this)
);
}

const pumpkin = new Cat('Pumpkin', 1, false);
pumpkin.meow(1);

# Javascript Declarative Methods [WIP]

## Filter

## Map

## Reduce
