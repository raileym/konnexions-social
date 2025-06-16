const badQuote = "This should trigger an error"  // Double quotes - should error
const goodQuote = 'This is fine'                 // Single quotes - should pass

console.log(badQuote, goodQuote)