
//LINKS

const locationAPILink = "http://ip-api.com/json";
//const weatherAPILink = "api.openweathermap.org/data/2.5/forecast";
const weatherAPILink = "http://api.apixu.com/v1/current.json";


//TEXT

// const NO_QUOTE_ERROR_TEXT = "Error loading quote text :(";
// const UNKNOWN_AUTHOR_TEXT = "Unknown";
// const LOADING_QUOTE_TEXT = "Loading quote...";

//IDs

const usersLocationID = "#users-location";
const getWeatherID = "#get-weather";
const latituteLongitudeID = "#lat-lon";
// const tweetLinkID = "#tweet-link";

//VARIABLES

var latitude;
var longitude;
var random;

//CODE

var ajaxGetLocationReqBody = {
  type: "GET",
  url: locationAPILink,
  success: function(data) {
    $(usersLocationID).text(data.city + ", " + data.country);
    latitude = data.lat;
    longitude = data.lon;
    random = "Hello";
    $(latituteLongitudeID).text(latitude + " | " + longitude);
  },
  error: function(error) {
    // $(quoteTextID).html(NO_QUOTE_ERROR_TEXT);
    // $(quoteAuthorID).text(UNKNOWN_AUTHOR_TEXT);
  },
  cache: false
};



// latitude = 48.6167;
// longitude = 22.3;

var ajaxGetWeatherReqBody = {
  type: "GET",
  url: weatherAPILink + "?key=" + weatherAppAPIKey + "&q=" + latitude + "," + longitude,
  success: function(data) {
    console.log(data);
  },
  error: function(error) {
    console.log("Failed to make a request to Weather");
  },
  cache: false
};

//MAIN

$(document).ready(function(){

  // $(quoteTextID).html(LOADING_QUOTE_TEXT);
  // $(quoteAuthorID).text(UNKNOWN_AUTHOR_TEXT);

  //When document loads, make first request to get quote
  $.ajax(ajaxGetLocationReqBody);

  //console.log(latitude + " " + longitude + " " + random);
  //$.ajax(ajaxGetWeatherReqBody);

  $(getWeatherID).on('click', function(e) {
    $.ajax(ajaxGetLocationReqBody);
  });
});
