
//LINKS

const locationAPILink = "http://ip-api.com/json";
const weatherAPILink = "http://api.apixu.com/v1/current.json";

//TEXT

const NO_LOCATION_TEXT = "Could not determine your location";
const NO_LON_LAT_TEXT = ":(";
const DETERMINING_LOCATION_TEXT = "Determining your location...";

//UI ELEMENT IDs

const usersLocationID = "#users-location";
const getWeatherID = "#get-weather";
const latituteLongitudeID = "#lat-lon";
const locationTemperatureInCelciusID = "#location-temperature-in-celcius";
const locationTemperatureInFahrenheitID = "#location-temperature-in-fahrenheit";
const locationWeatherConditionID = "#location-weather-condition";
const locationWeatherConditionImgID = "#location-weather-condition-img";
const locationSwitchTempID = "#location-switch-temp";

//VARIABLES

var showTemperatureInCelcius = true;

//CODE

function changeWeatherConditionBG(code) {
  var color;
  if(code <= 1003) {
    color = "#ffffb3";
  } else if (code <= 1063) {
    color = "#f2f2f2";
  } else if (code > 1063) {
    color = "#99ccff";
  } else {
    color = "white";
  }
  $(document.body).css('background-color', color);
}

var ajaxGetLocationAndWeatherReqBody = {
  type: "GET",
  url: locationAPILink,
  success: function(data) {
    $(locationTemperatureInFahrenheitID).hide();
    $(usersLocationID).text(data.city + ", " + data.country);
    $(latituteLongitudeID).text(data.lat + " | " + data.lon);

    //Perform retreival of weather information
    $.ajax({
      type: "GET",
      url: weatherAPILink + "?key=" + weatherAppAPIKey + "&q=" + data.lat + "," + data.lon,
      success: function(data) {

        //Retreive temp in Celcius
        $(locationTemperatureInCelciusID).text(data.current.temp_c + "°");

        //Retreive temp in Fahrenheit
        $(locationTemperatureInFahrenheitID).text("°" + data.current.temp_f)

        //Fill in data to UI
        $(locationWeatherConditionID).text(data.current.condition.text);
        $(locationWeatherConditionImgID).attr("src", "http:" + data.current.condition.icon);
        changeWeatherConditionBG(data.current.condition.code);
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

    //Set values to empty values until request is successful
    $(usersLocationID).text(DETERMINING_LOCATION_TEXT);
    $(latituteLongitudeID).text("");
    $(locationTemperatureInCelciusID).text("");
    $(locationTemperatureInFahrenheitID).text("");
    $(locationWeatherConditionImgID).attr("src", "");
    $(locationWeatherConditionID).text("");
    $(locationTemperatureInCelciusID).show();
    $(locationTemperatureInFahrenheitID).hide();
    $.ajax(ajaxGetLocationAndWeatherReqBody);
  });

  //Toggle between Celcius and Fahrenheit (UI only, no additional calls)
  $(locationSwitchTempID).on('click', function(e){
    if(showTemperatureInCelcius) {
      showTemperatureInCelcius = false;
      $(locationSwitchTempID).text("Switch to C°");
      $(locationTemperatureInCelciusID).hide();
      $(locationTemperatureInFahrenheitID).show();
    } else {
      showTemperatureInCelcius = true;
      $(locationSwitchTempID).text("Switch to °F");
      $(locationTemperatureInCelciusID).show();
      $(locationTemperatureInFahrenheitID).hide();
    }
  });
});
