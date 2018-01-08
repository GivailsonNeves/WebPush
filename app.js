

const messaging = firebase.messaging();

messaging.requestPermission()
    .then( () => {
        console.log('Notification permission granted.');
        document.getElementById("token").innerHTML = 'Notification permission granted.';
        // TODO(developer): Retrieve an Instance ID token for use with FCM.
        // ...
    })
    .catch( error => {
        console.log('Unable to get permission to notify.', error);
        document.getElementById("token").innerHTML = 'Unable to get permission to notify.';
    });



messaging.getToken()
    .then( currentToken => {
        if(currentToken){
            sendTokenToServer(currentToken);
            updateUIForPushEnabled(currentToken);
        }else{
            console.log('No Instance ID token available. Request permission to generate one.');
            document.getElementById("token").innerHTML = 'No Instance ID token available. Request permission to generate one.'
            // Show permission UI.
            updateUIForPushPermissionRequired();
            setTokenSentToServer(false);
        }
    } )
    .catch(function (err) {
        document.getElementById("token").innerHTML = 'An error occurred while retrieving token. '
        console.log('An error occurred while retrieving token. ', err);
        showToken('Error retrieving Instance ID token. ', err);
        setTokenSentToServer(false);
    });

// Callback fired if Instance ID token is updated.
messaging.onTokenRefresh(function () {
    messaging.getToken()
        .then(function (refreshedToken) {
            console.log('Token refreshed.');
            // Indicate that the new Instance ID token has not yet been sent to the
            // app server.
            setTokenSentToServer(false);
            // Send Instance ID token to app server.
            sendTokenToServer(refreshedToken);
            // ...
        })
        .catch(function (err) {
            document.getElementById("token").innerHTML = 'Unable to retrieve refreshed token ';
            console.log('Unable to retrieve refreshed token ', err);
            showToken('Unable to retrieve refreshed token ', err);
        });
});

messaging.onMessage(function (payload) {
    console.log("Message received. ", payload);
    window.alert("push chegou!");
});

function updateUIForPushPermissionRequired()
{
    console.log('updateUIForPushPermissionRequired');
}

function updateUIForPushEnabled(_a){

    document.getElementById("token").innerHTML = _a;
    
    console.log(_a);
}

function showToken(txt, obj){
    console.log(txt, obj);
}

function setTokenSentToServer(_bool){
    console.log(_bool);
}

function sendTokenToServer(_obj){
    console.log(_obj);
}