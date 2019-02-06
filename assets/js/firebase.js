var app_firebase = {};
(function () {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAfj2WK0xN8tscrKCME6Qzkgj2E1xRo8ng",
        authDomain: "destin-air.firebaseapp.com",
        databaseURL: "https://destin-air.firebaseio.com",
        projectId: "destin-air",
        storageBucket: "destin-air.appspot.com",
        messagingSenderId: "753142024366"
    };
    firebase.initializeApp(config);
    app_firebase = firebase;

})()