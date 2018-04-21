<
!-- //  [START Firebase] -->
< script;
src = "https://www.gstatic.com/firebasejs/4.12.0/firebase-firestore.js" > < /script>
    < script;
src = "https://www.gstatic.com/firebasejs/4.12.0/firebase.js" > < /script>
    < script >;
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBrmQzbLGYQvESUQrBNodOM5-_YgIimE7w",
    authDomain: "doly-crim.firebaseapp.com",
    databaseURL: "https://doly-crim.firebaseio.com",
    projectId: "doly-crim",
    storageBucket: "doly-crim.appspot.com",
    messagingSenderId: "146627230420"
};
firebase.initializeApp(config);
<
/script>


< !-- //  [START Firebase SDK] -->

<!-- update the version number as needed -->
< script;
defer;
src = "/__/firebase/4.12.0/firebase-app.js" > < /script>
    <!-- include only the Firebase features as you need -->
    < script;
defer;
src = "/__/firebase/4.12.0/firebase-auth.js" > < /script>
    < script;
defer;
src = "/__/firebase/4.12.0/firebase-database.js" > < /script>
    < script;
defer;
src = "/__/firebase/4.12.0/firebase-messaging.js" > < /script>
    < script;
defer;
src = "/__/firebase/4.12.0/firebase-storage.js" > < /script>
    < script;
defer;
src = "/__/firebase/4.12.0/firebaseApp.js" > < /script>

    < script >
    document.addEventListener('DOMContentLoaded', function () {
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
        // // The Firebase SDK is initialized and available here!
        //
        firebase.auth().onAuthStateChanged(user => {
        });
        firebase.database().ref('/path/to/ref').on('value', snapshot => {
        });
        firebase.messaging().requestPermission().then(() => {
        });
        firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => {
        });
        //
        // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

        try {
            let app = firebase.app();
            let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
            document.getElementById('load').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
        } catch (e) {
            console.error(e);
            document.getElementById('load').innerHTML = 'Error loading the Firebase SDK, check the console.';
        }
    });
<
/script>

<!-- initialize the SDK after all desired features are loaded -->
< script;
defer;
src = "/__/firebase/init.js" > < /script>

    < !-- //  [END Firebase SDK] -->

    < !--; //  [END Firebase] -->