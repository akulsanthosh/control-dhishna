var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

function getevents() {
    branch = document.getElementById("branch");
    branch = branch.value;
    sel = document.getElementById("event");
    sel.innerHTML = '<option value="">select...</option>';
    firebase.database().ref('/events/' + branch).once('value').then(function(snapshot) {
        snapshot.forEach(function (child) {

            s = '"'+child.key+'"';
            console.log(s)
            sel = document.getElementById("event");
            sel.innerHTML += '<option value='+s+">"+child.key+"</option>"
        })
        // ...
    });
}


function getparticipants() {
  event = document.getElementById("event").value;
  branch = document.getElementById("branch").value;
  if (event == ""){
      return
  }

  var table = document.querySelector('#usertable tbody');
  var events = firebase.database().ref().child('/registration/' + event);
  events.on('value', snap => {
    table.innerHTML="";
    snap.forEach(snapshot =>{
      var user = firebase.database().ref().child('/users/' + snapshot.key);
      user.once('value', sna => {
        var eve = snapshot.val();
        var row = table.insertRow(-1);
        cell = row.insertCell(-1);
        if(sna.val().name){
          cell.innerHTML = sna.val().name;
        }
        else {
          cell.innerHTML = snapshot.key;
        }
        cell = row.insertCell(-1);
        cell.innerHTML = eve;
        cell = row.insertCell(-1);
        cell.innerHTML = '<button type="button" name="attend" onclick="changestatus(\''+snapshot.key+'\')">Mark Attendence</button>'
      });
    });
  });
}


function changestatus(user) {
  console.log(user)
  event = document.getElementById("event").value;
  var events = firebase.database().ref().child('/registration/' + event+'/'+user);
  events.once('value', snap =>{
    console.log(snap.key)
    if(snap.val()==="paid") {
      events.set("attended");
    }
    else {
      events.set("paid");
    }
  });

}


function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

}
