/* A guide to Javascript prototype
 ** Source: https://tylermcginnis.com/beginners-guide-to-javascript-prototype/
 */

/*
 ** Function creates object, pass some props
 */

// function Animal(name, energy) {
//   let animal = {};
//   animal.name = name;
//   animal.energy = energy;

//   animal.eat = function(amount) {
//     console.log(`${this.name} is eating.`);
//     this.energy += amount;
//   };

//   animal.sleep = function(length) {
//     console.log(`${this.name} is sleeping.`);
//     this.energy += length;
//   };

//   animal.play = function(length) {
//     console.log(`${this.name} is playing.`);
//     this.energy -= length;
//   };

//   return animal;
// }

// const lion = Animal('Lion', 7);
// const tiger = Animal('Tiger', 10);

/*
 ** Functional Instantiation with Shared Methods
 */

// const animalMethods = {
//   eat(amount) {
//     console.log(`${this.name} is eating.`);
//     this.energy += amount;
//   },
//   sleep(length) {
//     console.log(`${this.name} is sleeping.`);
//     this.energy += length;
//   },
//   play(length) {
//     console.log(`${this.name} is playing.`);
//     this.energy -= length;
//   }
// };

// function Animal(name, energy) {
//   let animal = Object.create(animalMethods);
//   animal.name = name;
//   animal.energy = energy;

//   return animal;
// }

// const lion = Animal('Lion', 7);
// const tiger = Animal('Tiger', 10);
// lion.play;

/*
 ** Prototypal Instantiation
 ** Prototype is a property on a function that points to an object
 ** Prototype is just a property that every function in JS has
 ** Prototype sharing methods across all instances of a function
 ** In this example, the instances are lion, tiger and elephant
 */

/*
 ** Constructor function
 */

// function Animal(name, energy) {
//   /*
//    **   Delegate failed lookup to the functions prototype
//    **   This line is important because it creates the object
//    **   to delegate to the prototype on failed lookups
//    */
//   let animal = Object.create(Animal.prototype);
//   animal.name = name;
//   animal.energy = energy;

//   //  This returns the object we created
//   return animal;
// }

// /*
//  ** Add methods to the constructor functions prototype
//  ** Because of object.create, these methods are shared
//  */
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

// const lion = Animal('Lion', 7);
// const tiger = Animal('Tiger', 10);

// lion.eat(10);
// tiger.play(5);

// /*
//  ** Using the 'new' keyword
//  ** Using new keyword in front of a function invocation
//  ** JS will automatically (eg. implicitly)
//  ** perform Object.create and return and it will name the object 'this'
//  */
// const elephant = new Animal('Elephant', 100);

// elephant.sleep(5);

/*
 ** Constructor function with the 'new' keyword
 // This is kind of like a crappy version of a class
 // In other words a class is like a function that returns an object
 // And you can create different instances of that class.
 // 
 */

// function AnimalWithNew(name, energy) {
//   this.name = name;
//   this.energy = energy;

//   AnimalWithNew.prototype.eat = function(amount) {
//     console.log(`${this.name} is eating.`);
//     this.energy += amount;
//   };

//   AnimalWithNew.prototype.sleep = function(length) {
//     console.log(`${this.name} is sleeping.`);
//     this.energy += length;
//   };

//   AnimalWithNew.prototype.play = function(length) {
//     console.log(`${this.name} is playing.`);
//     this.energy -= length;
//   };
// }

// const lion = new AnimalWithNew('Lion', 7);
// const tiger = new AnimalWithNew('Tiger', 10);
// const elephant = new AnimalWithNew('Elephant', 100);

// lion.play(7);
// tiger.eat(1);
// elephant.sleep(4);

/*
 ** Now with ES6 we get a class keyword which is just syntactical sugar
 */

// class Animal {
//   constructor(name, energy) {
//     this.name = name;
//     this.energy = energy;
//   }
//   eat(amount) {
//     console.log(`${this.name} is eating.`);
//     this.energy += amount;
//   }
//   sleep(length) {
//     console.log(`${this.name} is sleeping.`);
//     this.energy += length;
//   }
//   play(length) {
//     console.log(`${this.name} is playing.`);
//     this.energy -= length;
//   }
// }

// const lion = new Animal('Lion', 7);
// const tiger = new Animal('Tiger', 10);
// const elephant = new Animal('Elephant', 100);

// lion.play(7);
// tiger.eat(1);
// elephant.sleep(4);

/*
 ** Now for some basic, "good to know", info about Prototype
 */

// const friends = []
// is really just syntactical sugar
// to create this
// const friendsWithoutSugar = new Array()

// Another question is how do we know that every instances of an array
// have all those methods, slice, pop, push, etc.
// So really this shows that because we are using the 'new' keyword
// The 'const friends' will now have access to the methods that live on arrays prototype

// If we want to lookup the prototype of an object
// use the following
// const prototype = Object.getPrototypeOf(obj)

// How can we loop over each item in the obj?

// for (let key in lion) {
//   console.log(`Key: ${key}. Value: ${lion[key]}`);
// }

// Using a 'for in' loop. A 'for in' loops over all the enumerable properties
// on both the object itself as well as the prototype that it delegates to
// Because by default any property you add to the functions prototype
// is enumerable, we see not only the properties the object, but in addition,
// we also see all the methods on the prototype that the object delegates to

// We can use 'hasOwnProperty' to determine where the property lives

// for (let key in lion) {
//   if (lion.hasOwnProperty(key)) {
//     console.log(`Key: ${key}. Value: ${lion[key]}`);
//   }
// }

// How to check if an object is a specific instance of a class
// we can use 'instanceof'

// Arrow functions do now have their own 'this' keyword
// Arrow fucntions can not be constructor functions

// const Animal = () => {};
// const lion = new Animal();

/*
 ** Animal is not a constructor!
 */

/*
 ** Cannot use new keyword on an arrow function!
 ** Arrow functions do not have a prototype property
 */
