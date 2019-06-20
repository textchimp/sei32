'use strict';

var BASE_URL = 'https://www.flickr.com/services/rest/';
var API_KEY = '2f5ac274ecfac5a455f38745704ad084';
var lastSearchText = '';
var pageCount = 1;

var searchFlickr = function searchFlickr(searchText) {

  $.getJSON(BASE_URL, {
    method: 'flickr.photos.search',
    text: searchText,
    page: pageCount,
    format: 'json',
    nojsoncallback: 1,
    api_key: API_KEY
  }).done(displaySearchResults); // .done()

  if (pageCount > 1) {
    $('#results').append('<hr>');
  }

  pageCount += 1;
}; // searchFlickr()

// Create a throttled version of searchFlickr() that is guaranteed not to run
// more often than once every 5 seconds, no matter how many times we actually
// call it - i.e., if you call the function again within 5 seconds, it will be
// ignored. This will stop us from making too many requests to the Flickr API
// in too short a timespan using infinite scroll, even if we scroll-bounce
// around at the bottom of the page.
var throttledSearchFlickr = _.throttle(searchFlickr, 5000);

var displaySearchResults = function displaySearchResults(response) {
  console.log(response);

  response.photos.photo.forEach(function (foto) {
    var photoURL = generatePhotoURL(foto);
    $('#results').append('<img src="' + photoURL + '" alt="' + foto.title + '">');
  });
}; // displaySearchResults()


var generatePhotoURL = function generatePhotoURL(photo) {
  var size = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'q';

  return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '_' + size + '.jpg';
};

$(document).ready(function () {

  $('#search-text').focus();

  $('#search-form').on('submit', function () {

    // 1. Get the search text entered into the text field
    var query = $('#search-text').val();
    lastSearchText = query; // save the query to a global variable, to use in our infinite scroll
    pageCount = 1; // reset page counter for this new search query
    $('#results').empty(); // clear the results DIV of thumbnails

    // 2. Use the search text in a URL to make an AJAX
    // request to the Flickr search API
    searchFlickr(query);

    return false; // do not submit the form (reload)
  }); // form submit handler


  $(window).on('scroll', function () {

    // distance between bottom of window and bottom of document
    var scrollBottom = $(document).height() - ($(window).scrollTop() + $(window).height());

    if (scrollBottom === 0) {
      console.log('at bottom!');

      throttledSearchFlickr(lastSearchText);
    }
  }); // scroll event handler

}); // document ready