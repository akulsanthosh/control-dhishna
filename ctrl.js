var config = {
    apiKey: "AIzaSyAZHCLuovX2oNhccuxjetkHNgAcrWcZLGo",
    authDomain: "dhisna-ac7e0.firebaseapp.com",
    databaseURL: "https://dhisna-ac7e0.firebaseio.com",
    projectId: "dhisna-ac7e0",
    storageBucket: "dhisna-ac7e0.appspot.com",
    messagingSenderId: "1079389260336"
};
firebase.initializeApp(config);

// function getevents() {
//     branch = document.getElementById("branch");
//     branch = branch.value;
//     sel = document.getElementById("event");
//     sel.innerHTML = '<option value="">select...</option>';
//     firebase.database().ref('/events/' + branch).once('value').then(function (snapshot) {
//         snapshot.forEach(function (child) {
//
//             s = '"' + child.key + '"';
//             console.log(s)
//             sel = document.getElementById("event");
//             sel.innerHTML += '<option value=' + s + ">" + child.key + "</option>"
//         })
//         // ...
//     });
// }


function getparticipants() {
    // event = document.getElementById("event").value;
    // branch = document.getElementById("branch").value;

    if (event_name !== 'def') {
        event = event_name;

        document.getElementById("ename").innerText = event_name;

        var table = document.querySelector('#usertable tbody');
        var events = firebase.database().ref().child('/registration/' + event);
        events.on('value', snap => {

            table.innerHTML = "";
            snap.forEach(snapshot => {
                var user = firebase.database().ref().child('/users/' + snapshot.key);
                user.once('value', sna => {

                    var eve = snapshot.val();
                    if (eve !== "team") {
                        var row = table.insertRow(-1);
                        row.setAttribute("id", snapshot.key);
                        cell = row.insertCell(-1);
                        if (sna.val().name) {
                            cell.innerHTML = sna.val().name;
                        } else {
                            cell.innerHTML = snapshot.key;
                        }
                        cell = row.insertCell(-1);
                        cell.innerHTML = eve;
                        cell = row.insertCell(-1);
                        cell.innerHTML = '<button type="button" name="attend" onclick="changeuser(\'' + snapshot.key + '\')">change atendee</button>';
                        cell = row.insertCell(-1);
                        cell.innerHTML = '<button type="button" name="attend" onclick="changestatus(\'' + snapshot.key + '\')">Mark Attendence</button>';
                        cell = row.insertCell(-1);
                        cell.innerHTML = '<button type="button" name="attend" onclick="addteam(\'' + snapshot.key + '\')">Add Team</button>'
                        cell = row.insertCell(-1);
                        cell.innerHTML = '<button type="button" name="attend" onclick="makewinner(\''+snapshot.key + '\')">Make Winner</button>'
                        number[snapshot.key] = 0
                    }
                });
            });
        });
    } else {
        alert("Auth error");
    }
}

hasChanged = false;
lastUser = 'nul';
bak = '';

function changeuser(user) {

    if (!hasChanged) {
        tm = document.getElementById(user);
        bak = tm.innerHTML;
        tm.innerHTML += '<label>Name : </label><input type="text" class="name"><br><br><label>Email : </label><input type="text" class="email"><br><br><button type="button" onclick="change(\'' + user + '\')" id="' + user + 'btn1">confirm change</button>';
        hasChanged = true;
        lastUser = user;

    } else if (hasChanged && user !== lastUser) {
        tm = document.getElementById(lastUser);
        tm.innerHTML = bak ;
        tm = document.getElementById(user);
        bak = tm.innerHTML;
        tm.innerHTML += '<label>Name : </label><input type="text" class="name"><br><br><label>Email : </label><input type="text" class="email"><br><br><button type="button" onclick="change(\'' + user + '\')" id="' + user + 'btn1">confirm change</button>';
        lastUser = user;
    }


}

function change(user) {
    hasChanged = false;
    tm = document.getElementById(user);
    if (event_name !== 'def') {
        event = event_name;
        var events = firebase.database().ref().child('/registration/' + event + '/' + user);

        name1 = tm.getElementsByClassName("name")[0].value;
        var events1 = firebase.database().ref().child('/registration/' + event + '/' + name1);


        var user1 = firebase.database().ref().child('/users/' + name1 + '/events' + event);
        events.set(null);
        events1.set("paid");
        user1.set("registered");
    } else {
        alert("Auth error");
    }
}

function changestatus(user) {
    console.log(user);
    // event = document.getElementById("event").value;
    if (event_name !== 'def') {
        event = event_name;
        var events = firebase.database().ref().child('/registration/' + event + '/' + user);
        events.once('value', snap => {
            console.log(snap.key)
            if (snap.val() === "paid") {
                events.set("attended");
            } else {
                events.set("paid");
            }
        });
    } else {
        alert("Auth error");
    }


}

number = {};

function addteam(user) {
    tm = document.getElementById(user);
    bn = document.getElementById(user + 'btn');
    if (number[user] < 5) {
        if (bn) {
            bn.parentNode.removeChild(bn);
        }

        dv = document.createElement("div");
        dv.innerHTML = '<label>Name : </label><input type="text" class="name' + number[user] + '"><br><br><label>Email : </label><input type="text" class="email' + number[user] + '"><br><br><button type="button" onclick="submitteam(\'' + user + '\')" id="' + user + 'btn">submit Team</button>';
        tm.appendChild(dv);
        number[user] += 1
    }
}

var dict = {
    "racecar@dhishna.org": "Race Car Designing",
    "chayagrahi@dhishna.org": "Chayagrahi",
    "deep@dhishna.org": "Deep Learning Workshop",
    'concrete@dhishna.org': "Construction Management in BIM",
    "smartcity@dhishna.org": "Smart Green City",
    " women@dhishna.org": "Women Techmakers",
    "metro@dhishna.org": "Kochi metro",
    "fire@dhishna.org": "Fire Training and CPR Workshop",
    "data@dhishna.org": "DATA SCIENCE USING PYTHON",
    "arduino@dhishna.org": "ARDUINO BEGINNER",
    "iot@dhishna.org": "INTERNET OF THINGS",
    "vlsi@dhishna.org": "VLSI",
    "scada@dhishna.org": "SCADA and PLC",
    "cloud@dhishna.org": "Cloud Computing Workshop",
    "engine@dhishna.org": " Engine Dismantling",
    "cansat@dhishna.org": "Cansat and Live Data Retrieval System",
    "fusion@dhishna.org": "fusion360 by Bimlabs",
    "battle@dhishna.org": "Battle of Brains",
    "codestorm@dhishna.org": "CodeStorm",
    "ftc@dhishna.org": "Find The Code",
    "ui@dhishna.org": "UI\\UX Challenge",
    "offroad@dhishna.org": "OFFROAD BIKING",
    "go@dhishna.org": "Go get 'em",
    "traipse@dhishna.org": "Traipse",
    "pilot@dhishna.org": "BE THE PILOT",
    "throttle@dhishna.org": "FULL THROTTLE",
    "gateway@dhishna.org": "GATEWAY",
    "seguace@dhishna.org": "SEGUACE",
    "shockwaves@dhishna.org": "SHOCKWAVES",
    "brain@dhishna.org": "Brain Cycle",
    "answer@dhishna.org": "Answer Buzz",
    "bridge@dhishna.org": "Bridge The Gap",
    "gol@dhishna.org": "Game of Life",
    "treasure@dhishna.org": "Treasure Hunt",
    "amaze@dhishna.org": "A-MAZE",
    "algox@dhishna.org": "AlgoXtreme",
    "foundar@dhishna.org": "FoundAR",
    "mind@dhishna.org": "MindSPARK",
    "reality@dhishna.org": "Reality Unknown",
    "male@dhishna.org": "male",
    "female@dhishna.org": "female"
};

event_name = 'def';

function login() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    if (!(email in dict)){
        alert("Email is wrong")
        return
    }
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function () {

        firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
            alert("successful");
            alert(dict[email]);
            event_name = dict[email];
            // getparticipants();

        }).catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorMessage);
            event_name = 'def';
            document.getElementById("ename").innerText = '';

            tble = document.getElementById("userbody");
            tble.innerHTML = ""
            firebase.auth().signOut();

        });

    })

}


function submitteam(user) {
    tm = document.getElementById(user);
    // event = document.getElementById("event").value;
    event = event_name;
    nm = {};

    em = {};
    for (var i = 0; i < number[user]; i++) {
        nm[tm.getElementsByClassName("name" + i)[0].value] = "team";
        em[tm.getElementsByClassName("email" + i)[0].value] = "team";
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(tm.getElementsByClassName("email" + i)[0].value))
        {
            alert("Email checked. Adding to database now")
            var us = firebase.database().ref().child('/users/' + tm.getElementsByClassName("name" + i)[0].value + "/events/" + event);
            var mail = firebase.database().ref().child('/users/' + tm.getElementsByClassName("name" + i)[0].value + "/email/");
            mail.set(tm.getElementsByClassName("email" + i)[0].value);
            us.set("registered");
            console.log(number[user]);
        }
        else {
            alert("You have entered an invalid email address!");
            return (false);
        }

    }

    var events = firebase.database().ref().child('/registration/' + event);

    events.update(nm);
    number = {}
}

no ={};
function makewinner(user){
    tm = document.getElementById(user);
    bn = document.getElementById(user + 'btn');
    if (no[user]!=1) {
        dv = document.createElement("div");
        dv.innerHTML = '<label>Position : </label><input type="text" class="pos"><br><br><l<button type="button" onclick="pushwinner(\'' + user + '\')" id="' + user + 'btn">Update details</button>';
        tm.appendChild(dv);
        no[user]=1;
    }
}

var name = 'def';
function pushwinner(user){
    no[user]=0;
    tm = document.getElementById(user);
    // event = document.getElementById("event").value;
    event = event_name;
    // nm={};
    // nm[user]=tm.getElementsByClassName("pos").value;

    var events = firebase.database().ref().child('/registration/' + event).child(user);

    events.set(tm.getElementsByClassName("pos")[0].value);
}
firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        event_name = dict[user.email];
        getparticipants();

    }
})