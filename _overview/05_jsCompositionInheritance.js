/*
 ** Is this example we have abstracted the common features
 ** of each Animal(name, energy, eat, sleep, play) to the Animal
 ** base class. Then for each individual type of animal (Dog, Cat)
 ** we created a subclass for each.
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
//   sleep() {
//     console.log(`${this.name} is sleeping.`);
//     this.energy += length;
//   }
//   play() {
//     console.log(`${this.name} is playing.`);
//     this.energy -= length;
//   }
// }

// class Dog extends Animal {
//   constructor(name, energy, breed) {
//     super(name, energy);

//     this.breed = breed;
//   }
//   bark() {
//     console.log('Woof Woof!');
//     this.energy -= 0.1;
//   }
// }

// class Cat extends Animal {
//   constructor(name, energy, declawed) {
//     super(name, energy);

//     this.declawed = declawed;
//   }
//   meow() {
//     console.log('Meow!');
//     this.energy -= 0.1;
//   }
// }

/*
 ** Without code this is visualized as follows
 */

// Animal
//   name
//   energy
//   eat()
//   sleep()
//   play()

//   Dog
//     breed
//     bark()

//   Cat
//     declawed
//     meow()

/*
 ** We can take this a step further and add a User class
 ** This is a good example of classes and inheritance
 */

// User
//   email
//   username
//   pets
//   friends
//   adopt()
//   befriend()

// Animal
//   name
//   energy
//   eat()
//   sleep()
//   play()

//   Dog
//     breed
//     bark()

//   Cat
//     declawed
//     meow()

/*
 ** Let's say that we have one class has some properties that
 ** we now want another class to also have.
 ** We could abstract the common properties to another parent class
 ** and then add one more step of inheritance.
 */

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

/*
 ** This works but A) it's fragile and B) it's an anti-pattern
 ** AKA God-Object https://en.wikipedia.org/wiki/God_object
 */

/*
 ** Now we are dealing with the problem with inheritance.
 ** In the future, what User IS could change and if/when
 ** it does, the tightly coupled inheritance structure will crumble.
 */

/*
 ** So, instead of thinking about what things ARE, let's
 ** think about what things DO
 */

// const eater = () => ({})
// const sleeper = () => ({})
// const player = () => ({})
// const barker = () => ({})
// const meower = () => ({})
// const adopter = () => ({})
// const friender = () => ({})

/*
 ** Instead of having these methods defined (and coupled) to
 ** a particular class, we can abstract them into their own
 ** functions and compose them together with any type that needs them.
 */

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

/*
 ** Now, whenever a Dog, Cat, or User needs to add the ability
 ** to do any of the functions, we can merge the object they get
 ** from one of the functions onto their own object.
 */

// For example, we know Dog sleeps, eats, plays and barks.

// function Dog(name, energy, breed) {
//   let dog = {
//     name,
//     energy,
//     breed
//   };

//   return Object.assign(dog, eater(dog), sleeper(dog), player(dog), barker(dog));
// }

// const fin = Dog('Fin', 5, 'Labradoodle');
// fin.eat(10); // Fin is eating
// fin.bark(); // Woof Woof!

// We know Cat sleeps, eats, plays, and meows

// function Cat(name, energy, declawed) {
//   let cat = {
//     name,
//     energy,
//     declawed
//   };

//   return Object.assign(cat, eater(cat), sleeper(cat), player(cat), meower(cat));
// }

/*
 ** Now, based on this de-coupling, we can add some of the
 ** methods previously only available to Animal, to User.Animal
 ** We can let the User sleep, eat, and play
 */

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

/*
 ** To take this one step further, we could give Dogs
 ** the ability to add friends, previously only a method
 ** a User could do.
 */

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

/*
 ** These  ☝️ are the "Functional Instantiation" pattern.
 ** This is not involving the prototype at all.
 ** If we want to use this pattern with the 'new' keyword
 ** We could do the following
 */

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
