
//LINKS

const locationAPILink = "http://ip-api.com/json";
//const weatherAPILink = "api.openweathermap.org/data/2.5/forecast";
const weatherAPILink = "http://api.apixu.com/v1/current.json";

//TEXT

const NO_LOCATION_TEXT = "Could not determine your location";
const NO_LON_LAT_TEXT = ":(";

//IDs

const usersLocationID = "#users-location";
const getWeatherID = "#get-weather";
const latituteLongitudeID = "#lat-lon";
const locationTemperatureID = "#location-temperature";
const locationWeatherConditionID = "#location-weather-condition";
const locationWeatherConditionImgID = "#location-weather-condition-img";

//VARIABLES

var latitude;
var longitude;

//CODE

var ajaxGetLocationAndWeatherReqBody = {
  type: "GET",
  url: locationAPILink,
  success: function(data) {
    $(usersLocationID).text(data.city + ", " + data.country);
    latitude = data.lat;
    longitude = data.lon;
    $(latituteLongitudeID).text(latitude + " | " + longitude);

    //Perform retreival of weather information
    $.ajax({
      type: "GET",
      url: weatherAPILink + "?key=" + weatherAppAPIKey + "&q=" + latitude + "," + longitude,
      success: function(data) {
        $(locationTemperatureID).text(data.current.temp_c + "°");
        $(locationWeatherConditionID).text(data.current.condition.text);
        $(locationWeatherConditionImgID).attr("src", "http:" + data.current.condition.icon);
      },
      error: function(error) {
        console.log("Failed to make a request to Weather");
      },
      cache: false
    })
  },
  error: function(error) {
    $(usersLocationID).text(NO_LOCATION_TEXT);
    $(latituteLongitudeID).text(NO_LON_LAT_TEXT);
  },
  cache: false
};

//MAIN

$(document).ready(function(){

  //When document loads, make first request to get location
  $.ajax(ajaxGetLocationAndWeatherReqBody);

  $(getWeatherID).on('click', function(e) {
    $.ajax(ajaxGetLocationAndWeatherReqBody);
  });
});
