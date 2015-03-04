$(document).ready(function() {
  $('input:not(.search').floatlabel();
});
// Rich, can you add a js function?
// when user clicks .AAA-toggle
// system finds parent .AAA-watch and toggles class .AAA-active (if yes, remove. if none, add)
// every .AAA-watch has a .AAA-toggle inside it.
// every .AAA-toggle is inside a .AAA-watch.
//
// later on we can add more functions to it...
// like hover (for dropdowns)
// horizontal swipe (for offmenu on devices)
// etc
//
// $(window).scroll(function() {
// // 100 = The point you would like to fade the nav in.
//   if ($(window).scrollTop() > 150 ){
//     $('html').addClass('trans');
//   } else {
//     $('html').removeClass('trans');
//   };
// });
