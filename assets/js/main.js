$(document).ready(function () {
    var apiKey = "5aektkmcrC8YFtJr8";

    $('#weatherSearch').on("click", function (event) {
        event.preventDefault();
        var cityElement = $('#cityAir').val();
        var stateElement = $('#stateAir').val();
        var countryElement = $('#countryAir').val();
        if (countryElement == "united states" || countryElement == "us" || countryElement == "usa") {
            var countryElement = "usa";
        } else {
            countryElement = countryElement;
        }

        var queryURL = "https://api.airvisual.com/v2/city?city=" + cityElement + "&state=" + stateElement + "&country=" + countryElement + "&key=" + apiKey;


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            var results = response.data;

            var city = results.city;
            var state = results.state;
            var country = results.country;
            var coordinatesLong = results.location.coordinates[0];
            var coordinatesLat = results.location.coordinates[1];
            var humidity = results.current.weather.hu;
            var pressure = results.current.weather.pr;
            var temperature = (results.current.weather.tp * 9 / 5) + 32;
            var windDirection = results.current.weather.wd;
            var windSpeed = results.current.weather.ws;


        });
        ajaxRequest(queryURL);

        // ajax request takes differnt urls
        function ajaxRequest(url, cityError) {
            $.ajax({
                url: url,
                method: "GET",
                success: function (response) {
 
  
                    var results = response.data;
                    

                    var city = results.city;
                    var state = results.state;
                    var country = results.country;
                    var coordinatesLong = results.location.coordinates[0];
                    var coordinatesLat = results.location.coordinates[1];
                    var humidity = results.current.weather.hu;
                    var pressure = results.current.weather.pr;
                    var temperature = (results.current.weather.tp * 9 / 5) + 32;
                    var windDirection = results.current.weather.wd;
                    var windSpeed = results.current.weather.ws;
                    var usaqi = results.current.pollution.aqius;
                    var mainus = results.current.pollution.mainus;

                  
                    renderAirQuality(city, state, usaqi, mainus);
                    geolocation(city, state, country, usaqi);



                    $("#cityWeather").text(city);

                    $("#humidity").text("Humidity: " + humidity);
                    $("#temp").text("Temperature: " + temperature);
                    $("#windDir").text("Wind Direction: " + windDirection);
                    $("#windSpeed").text("Wind Speed: " + windSpeed);

                    //cards that display information based on usaqi
                    var displayImage;
                    switch (true) {
                        case (usaqi <= 20):
                            displayImage = "assets/images/goodAir.png";
                            break;
                        case (usaqi >= 21 && usaqi <= 100):
                            displayImage = "assets/images/okAir.png";
                            break;
                        case (usaqi >= 101 && usaqi <= 400):
                            displayImage = "assets/images/badAir.png";
                    }
                    var imgDiv = $("<div>");
                    $(imgDiv).addClass("imgDiv");
                    var cityContent = $("<div>");
                    $(cityContent).html(city);
                    $(cityContent).css({
                        "background-color": "#1f161680",
                        "color": "#ffff", "font-size": "18px", "padding": "10px", "width": "390px"
                    });
                    $(imgDiv).html("CLICK TO MOVE");
                    $(imgDiv).append("<i class='far fa-window-close'></i>");
                    $(".fa-window-close").css({ "right": "0" });
                    $(imgDiv).addClass("dragDiv");
                    $(imgDiv).css({ "margin": "10%" });
                    var image = $("<img>");
                    image.attr({
                        'src': displayImage,
                        "height": "200px",
                        "data-name": city,
                        "class": "card"
                    });
                    $('.weather-grid-container').append(imgDiv);
                    $(imgDiv).append(cityContent);
                    $(cityContent).append(image);

                },
                //error handling for country, state, and city
                error: function (errormessage) {
                    if (errormessage.responseJSON.data.message == "city_not_found") {
                        var stateElement = $('#stateAir').val();
                        var countryElement = $('#countryAir').val();

                        queryURL = "https://api.airvisual.com/v2/cities?state="+stateElement+"&country="+countryElement+"&key="+apiKey;
                        ajaxRequest(queryURL);
                     
                    } else if (errormessage.responseJSON.data.message == "arguments_missing") {
                        var countryElement = $('#countryAir').val();
                        queryURL = "https://api.airvisual.com/v2/states?country=" + countryElement + "&key="+apiKey;
                        ajaxRequest(queryURL);
                    }
                }
            });
        }
        function renderAirQuality(city, state, usaqi, mainus) {
            $('.air-card-header').html(city + " " + state);
            $('.air-card-usaqi').html("US AQI");
            $('.air-card-text').html(+usaqi);
            $('.air-card-mainus').html(mainus);

        }

    });
    //close info image element
    function closeInfoCard() {
        $(this).closest(".imgDiv").remove();
    }
    //listener for dynamic created elements
    $(document).on('click', '.fa-window-close', closeInfoCard);

    //adds drag class and removes drag class
    $(function () {
        $('.card').hover(function () {
            $(this).addClass('dragDiv');
            $('.dragDiv').mousedown(handle_mousedown);
        },
            function () {
                $(this).removeClass('dragDiv');
            }

        );
    });
    //drag function
    function handle_mousedown(e) {
        window.my_dragging = {};
        my_dragging.pageX0 = e.pageX;
        my_dragging.pageY0 = e.pageY;
        my_dragging.elem = this;
        my_dragging.offset0 = $(this).offset();
        function handle_dragging(e) {
            var left = my_dragging.offset0.left + (e.pageX - my_dragging.pageX0);
            var top = my_dragging.offset0.top + (e.pageY - my_dragging.pageY0);
            $(my_dragging.elem)
                .offset({ top: top, left: left });
        }
        function handle_mouseup(e) {
            $('body')
                .off('mousemove', handle_dragging)
                .off('mouseup', handle_mouseup);
        }
        $('body')
            .on('mouseup', handle_mouseup)
            .on('mousemove', handle_dragging);
    }

    function geolocation(city, state, country, response){
        console.log(city+" "+state+" "+country,JSON.stringify(response));
        // var testInfo = city+" "+state+" "+country;
        var testInfo = city;

    /**
 * Calculates and displays the address details of 200 S Mathilda Ave, Sunnyvale, CA
 * based on a free-form text
 *
 *
 * A full list of available request parameters can be found in the Geocoder API documentation.
 * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-geocode.html
 *
 * @param   {H.service.Platform} platform    A stub class to access HERE services
 */
function geocode(platform) {
    var geocoder = platform.getGeocodingService(),
      geocodingParameters = {
        searchText: testInfo,
        jsonattributes : 1
      };
  
    geocoder.geocode(
      geocodingParameters,
      onSuccess,
      onError
    );
  }
  /**
   * This function will be called once the Geocoder REST API provides a response
   * @param  {Object} result          A JSONP object representing the  location(s) found.
   *
   * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-type-response-geocode.html
   */
  function onSuccess(result) {
    var locations = result.response.view[0].result;
   /*
    * The styling of the geocoding response on the map is entirely under the developer's control.
    * A representitive styling can be found the full JS + HTML code of this example
    * in the functions below:
    */
    addLocationsToMap(locations);
    addLocationsToPanel(locations);
    // ... etc.
  }
  
  /**
   * This function will be called if a communication error occurs during the JSON-P request
   * @param  {Object} error  The error message received.
   */
  function onError(error) {
    alert('Ooops!');
  }
  
  
  
  
  /**
   * Boilerplate map initialization code starts below:
   */
  
  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: '6yFbpJ8TwoZAlzj4jLAt',
    app_code: 'tr3VSbRXt94KCbBZBLQokQ',
    useHTTPS: true
  });
  




  var pixelRatio = window.devicePixelRatio || 1;
  var defaultLayers = platform.createDefaultLayers({
    tileSize: pixelRatio === 1 ? 256 : 512,
    ppi: pixelRatio === 1 ? undefined : 320
  });
  
  //Step 2: initialize a map - this map is centered over California
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map,{
    center: {lat:37.376, lng:-122.034},
    zoom: 15,
    pixelRatio: pixelRatio
  });
  
  var locationsContainer = document.getElementById('panel');
  
  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  
  // Create the default UI components

  var ui = H.ui.UI.createDefault(map, defaultLayers);
  
  // Hold a reference to any infobubble opened
  var bubble;
  
  /**
   * Opens/Closes a infobubble
   * @param  {H.geo.Point} position     The location on the map.
   * @param  {String} text              The contents of the infobubble.
   */
  function openBubble(position, text){
   if(!bubble){
      bubble =  new H.ui.InfoBubble(
        position,
        {content: text});
    
      ui.addBubble(bubble);
    } else {
      bubble.setPosition(position);
      bubble.setContent(text);
      bubble.open();
    }
  }
  
  function createInfoBubble(map, position) {
    // Create info bubble

    var bubble = new H.ui.InfoBubble({position}, {
        content: '<b>Hello World!</b>'
    });
    // Add info bubble to the UI:
    ui.addBubble(bubble);
}
  
  /**
   * Creates a series of list items for each location found, and adds it to the panel.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToPanel(locations){
  
    var nodeOL = document.createElement('ul'),
      i;
  
    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft ='5%';
    nodeOL.style.marginRight ='5%';
  
  
     for (i = 0;  i < locations.length; i += 1) {
       var li = document.createElement('li'),
          divLabel = document.createElement('div'),
          address = locations[i].location.address,
          content =  '<strong style="font-size: large;">' + address.label  + '</strong></br>';
          position = {
            lat: locations[i].location.displayPosition.latitude,
            lng: locations[i].location.displayPosition.longitude
          };
  
        content += '<strong>houseNumber:</strong> ' + address.houseNumber + '<br/>';
        content += '<strong>street:</strong> '  + address.street + '<br/>';
        content += '<strong>district:</strong> '  + address.district + '<br/>';
        content += '<strong>city:</strong> ' + address.city + '<br/>';
        content += '<strong>postalCode:</strong> ' + address.postalCode + '<br/>';
        content += '<strong>county:</strong> ' + address.county + '<br/>';
        content += '<strong>country:</strong> ' + address.country + '<br/>';
        content += '<br/><strong>position:</strong> ' +
          Math.abs(position.lat.toFixed(4)) + ((position.lat > 0) ? 'N' : 'S') +
          ' ' + Math.abs(position.lng.toFixed(4)) + ((position.lng > 0) ? 'E' : 'W');
  
        divLabel.innerHTML = content;
        li.appendChild(divLabel);
  
        nodeOL.appendChild(li);
    }
  
    locationsContainer.appendChild(nodeOL);
  }
  
  
  /**
   * Creates a series of H.map.Markers for each location found, and adds it to the map.
   * @param {Object[]} locations An array of locations as received from the
   *                             H.service.GeocodingService
   */
  function addLocationsToMap(locations){
    var group = new  H.map.Group(),
      position,
      i;
  
    // Add a marker for each location found
    for (i = 0;  i < locations.length; i += 1) {
      position = {
        lat: locations[i].location.displayPosition.latitude,
        lng: locations[i].location.displayPosition.longitude
      };
      marker = new H.map.Marker(position);
      marker.label = locations[i].location.address.label;
      group.addObject(marker);
    }
  
    group.addEventListener('tap', function (evt) {
      map.setCenter(evt.target.getPosition());
      openBubble(
         evt.target.getPosition(), evt.target.label);
    }, false);
  
    // Add the locations group to the map
    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
  }
  
  // Now use the map as required...
  geocode(platform);
    }
    



      
    

});


