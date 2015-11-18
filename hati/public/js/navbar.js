$(document).ready(function() {
  if(window.location.href.indexOf('search') > -1) {
    $('#searchNavbar').toggleClass('active');
  } else if(window.location.href.indexOf('tour') > -1) {
    $('#tourNavbar').toggleClass('active');
  } else if(window.location.href.indexOf('navigation') > -1) {
    $('#navigationNavbar').toggleClass('active');
  }
});
