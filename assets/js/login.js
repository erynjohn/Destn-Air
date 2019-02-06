(function(){
    // Initialize the FirebaseUI Widget using Firebase.
var ui = new firebaseui.auth.AuthUI(firebase.auth());

    var uiConfig = {
        callbacks: {
          signInSuccessWithAuthResult: function(authResult, redirectUrl) {
            // User successfully signed in.
            // Return type determines whether we continue the redirect automatically
            // or whether we leave that to developer to handle.
            return true;
          },
          uiShown: function() {
            // The widget is rendered.
            // Hide the loader.
            document.getElementById('loader').style.display = 'none';
          }
        },
        // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
        signInFlow: 'popup',
      signInSuccessUrl: 'main.html',
      signInOptions: [
        // Leave the lines as is for the providers you want to offer your users.
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        //firebase.auth.GithubAuthProvider.PROVIDER_ID,
        //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      
    };

    //current users login info
    firebase.auth().onAuthStateChanged(function(user) {

      
      if (user) {
        console.log(user.uid);
        console.log(user.displayName);
        console.log(user.email);
   
      } else {
        console.log("no user");
      }
    });
    //get user profile info
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;
    
        //get user profile info
var user = firebase.auth().currentUser;
var name, email, photoUrl, uid, emailVerified;

    // The start method will wait until the DOM is loaded.
ui.start("#firebaseui-auth-container", uiConfig);
})()
var apiKey = "5aektkmcrC8YFtJr8";

var queryURL = "https://api.airvisual.com/v2/nearest_city?key="+apiKey;


$.ajax({
  url: queryURL,
  method: "GET"
}).then(function (response) {
  var results = response.data;
  var city = results.city;
  var state = results.state;
  var country = results.country;
  var humidity = results.current.weather.hu;
  var pressure = results.current.weather.pr;
  var temperature = (results.current.weather.tp * 9 / 5) + 32;
  var windDirection = results.current.weather.wd;
  var windSpeed = results.current.weather.ws;
  var usaqi = results.current.pollution.aqius;
  var mainus = results.current.pollution.mainus;
  $("#cityWeather").text(city);
  $("#humidity").text("Humidity: " + humidity);
  $("#temp").text("Temperature: " + temperature);
  $("#windDir").text("Wind Direction: " + windDirection);
  $("#windSpeed").text("Wind Speed: " + windSpeed);
  $('.air-card-header').text(city + " " + state);
  $('.air-card-usaqi').text("US AQI");
  $('.air-card-text').text(+usaqi);
  $('.air-card-mainus').text(mainus);
});
