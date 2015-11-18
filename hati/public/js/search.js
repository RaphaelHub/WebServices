$(document).ready(function() {
  getSearchResults();
});

function getSearchResults(title) {
  $.get('/searchresults?title=' + title, function(data) {
    $('.searchresults').html(data);
  });
}

$('#search').keyup(function() {
  getSearchResults($(this).val());
});
