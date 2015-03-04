// in order to work, .*-watch always has .*-toggle inside, and .*-toggle always reside inside a .*-watch parent.
// check note.html and offset.html examples to see it in action.

// for now, interactions are inline, global...
// onClick="$('.offset-watch').toggleClass('offset-active')"

// the idea is to abstract it away...
// ANY .*-toggle element when clicked:
// - navigates up to the closest .*-watch parent
// - verifies if it also has .*-active class
//   - if no, adds .*-active class of .*-watch object
//   - if yes, removes .*-active class of .*-watch object

