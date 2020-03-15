/*
 ** Imperative (HOW)
 */

/*
 ** Example 1
 */

// function double (arr) {
//   let results = []
//   for (let i = 0; i < arr.length; i++){
//     results.push(arr[i] * 2)
//   }
//   return results
// }

/*
 ** Example 2
 */

// function add (arr) {
//   let result = 0
//   for (let i = 0; i < arr.length; i++){
//     result += arr[i]
//   }
//   return result
// }

/*
 ** Example #3
 */

// $("#btn").click(function() {
//   $(this).toggleClass("highlight")
//   $(this).text() === 'Add Highlight'
//     ? $(this).text('Remove Highlight')
//     : $(this).text('Add Highlight')
// })

/*
 ** Declarative (WHAT)
 ** Functional programming is subset of declarative
 ** Start with .map, .reduce, and .filter
 ** and work your way up from there
 */

/*
 ** Example #1
 */

// function double (arr) {
//   return arr.map((item) => item * 2)
// }

/*
 ** Example #2
 */

// function add (arr) {
//   return arr.reduce((prev, current) => prev + current, 0)
// }

/*
 ** Example #3
 */

/*
 ** <Btn
 **   onToggleHighlight={this.handleToggleHighlight}
 **   highlight={this.state.highlight}>
 **     {this.state.buttonText}
 ** </Btn>
 */
