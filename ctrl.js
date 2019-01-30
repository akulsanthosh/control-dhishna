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
    firebase.database().ref('/events/' + branch).once('value').then(function (snapshot) {
        snapshot.forEach(function (child) {

            s = '"' + child.key + '"';
            console.log(s)
            sel = document.getElementById("event");
            sel.innerHTML += '<option value=' + s + ">" + child.key + "</option>"
        })
        // ...
    });
}


function getparticipants() {
    event = document.getElementById("event").value;
    branch = document.getElementById("branch").value;
    if (event == "") {
        return
    }

    var table = document.querySelector('#usertable tbody');
    var events = firebase.database().ref().child('/registration/' + event);
    events.on('value', snap => {
        table.innerHTML = "";
        snap.forEach(snapshot => {
            var user = firebase.database().ref().child('/users/' + snapshot.key);
            user.once('value', sna => {

                var eve = snapshot.val();
                if (eve!=="team") {
                    var row = table.insertRow(-1);
                    row.setAttribute("id", snapshot.key);
                    cell = row.insertCell(-1);
                    if (sna.val().name) {
                        cell.innerHTML = sna.val().name;
                    }
                    else {
                        cell.innerHTML = snapshot.key;
                    }
                    cell = row.insertCell(-1);
                    cell.innerHTML = eve;
                    cell = row.insertCell(-1);
                    cell.innerHTML = '<button type="button" name="attend" onclick="changestatus(\'' + snapshot.key + '\')">Mark Attendence</button>'
                    cell = row.insertCell(-1);
                    cell.innerHTML = '<button type="button" name="attend" onclick="addteam(\'' + snapshot.key + '\')">Add Team</button>'
                }
            });
        });
    });
}


function changestatus(user) {
    console.log(user);
    event = document.getElementById("event").value;
    var events = firebase.database().ref().child('/registration/' + event + '/' + user);
    events.once('value', snap => {
        console.log(snap.key)
        if (snap.val() === "paid") {
            events.set("attended");
        }
        else {
            events.set("paid");
        }
    });

}

number = 0;

function addteam(user) {
    tm = document.getElementById(user);
    bn = document.getElementById(user + 'btn');
    if (bn) {
        bn.parentNode.removeChild(bn);
    }
    if (number < 5) {
        dv = document.createElement("div");
        dv.innerHTML = '<label>Name : </label><input type="text" class="name' + number + '"><br><br><label>Email : </label><input type="text" class="email' + number + '"><br><br><button type="button" onclick="submitteam(\'' + user + '\')" id="' + user + 'btn">submit Team</button>';
        tm.appendChild(dv);
        number += 1
    }
}


function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
    });

}

function submitteam(user) {
    tm = document.getElementById(user);
    event = document.getElementById("event").value;
    nm = {};
    em = {};
    for (var i = 0; i < number; i++) {
        nm[tm.getElementsByClassName("name" + i)[0].value] = "team";
        var us = firebase.database().ref().child('/users/' + tm.getElementsByClassName("name" + i)[0].value + "/events/" + event);
        us.set("registered");
    }

    var events = firebase.database().ref().child('/registration/' + event);

    events.update(nm);
    number = 0;
}