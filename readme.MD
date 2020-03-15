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
