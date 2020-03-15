/*
** Private and Public Class Fields
** Source: https://tylermcginnis.com/javascript-private-and-public-class-fields/
** Class fields proposal: https://github.com/tc39/proposal-class-fields
*/

// class Player {
//   constructor() {
//     this.points = 0
//     this.assists = 0
//     this.rebounds = 0
//     this.steals = 0
//   }
//   addPoints(amount) {
//     this.points += amount
//   }
//   addAssist() {
//     this.assists++
//   }
//   addRebound() {
//     this.rebounds++
//   }
//   addSteal() {
//     this.steals++
//   }
// }

/*
** We want to make ☝️ this more intuitive
*/

// The TC39 Proposal gives us this:

// class Player {
//   points = 0
//   assists = 0
//   rebounds = 0
//   steals = 0
//   addPoints(amount) {
//     this.points += amount
//   }
//   addAssist() {
//     this.assists++
//   }
//   addRebound() {
//     this.rebounds++
//   }
//   addSteal() {
//     this.steals++
//   }
// }

/*
** This is useful in React components 👇
*/

// class PlayerInput extends Component {
//   constructor(props) {
//     super(props)
//     // We can remove this 👇
//     // this.state = {
//     //   username: ''
//     // }

//     this.handleChange = this.handleChange.bind(this)
//   }
//   handleChange(event) {
//     this.setState({
//       username: event.target.value
//     })
//   }
//   render() {
//     ...
//   }
// }

// PlayerInput.propTypes = {
//   id: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   onSubmit: PropTypes.func.isRequired,
// }

// PlayerInput.defaultProps = {
//   label: 'Username',
// }

/*
** We can also move propTypes and defaultProps in to the class! 🚀
*/

// class PlayerInput extends Component {
//   static propTypes = {
//     id: PropTypes.string.isRequired,
//     label: PropTypes.string.isRequired,
//     onSubmit: PropTypes.func.isRequired,
//   }
//   static defaultProps = {
//     label: 'Username'
//   }
//   state = {
//     username: ''
//   }
//   constructor(props) {
//     super(props)

//     this.handleChange = this.handleChange.bind(this)
//   }
//   handleChange(event) {
//     this.setState({
//       username: event.target.value
//     })
//   }
//   render() {
//     ...
//   }
// }

// Now we can remove the constructor function and the super invocation
// We know that the 'this' keyword on arrow functions is lexically scoped
// If we swap 'handleChange' for an arrow function
// We are able to eliminate the bind issue because of the way
// the arrow function binds 'this' lexically.

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

// What to consider about class fields. Performance
// With a constructor function, the object is defined once
// and shared across all instances of the class.
// Since class fields are added to the instance, for each
// instance that is created, a new object method is created.
// The question should be, does the DX gained from class fields
// outweigh the potential performance hit.

// To use the class fields the following plugin is needed:
// babel-plugin-transform-class-properties

// Also in JS, historically, there has been the lack of a private
// values, and historically we have marked them with an underscore.

// For example

// class Car {
//   _milesDriven = 0
//   drive(distance) {
//     this._milesDriven += distance
//   }
//   getMilesDriven() {
//     return this._milesDriven
//   }
// }

// In this case, we have a visual representation of the private value
// _milesDriven, but really any instance can access it

// For the TC39 proposal, we can create a private value with the # (octothrope)

// class Car {
//   #milesDriven = 0
//   drive(distance) {
//     #milesDriven += distance
//   }
//   getMilesDriven() {
//     return #milesDriven
//   }
// }

// const tesla = new Car()
// tesla.drive(10)
// tesla.getMilesDriven() // 10
// tesla.#milesDriven // Invalid

// For more info: https://github.com/tc39/proposal-private-fields/blob/master/FAQ.md