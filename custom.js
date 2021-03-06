showDashboard = function () {
    let dash = document.getElementById("dashboard");
    let users = document.getElementById("users");
    dash.style.display = "block";
    users.style.display = "none";
};

showUsers = function () {
    let dash = document.getElementById("dashboard");
    let users = document.getElementById("users");
    dash.style.display = "none";
    users.style.display = "block";
};

let ws = new WebSocket('ws://192.168.0.21:8080')

ws.onopen = function (event) {
    ws.send("Connected");
};


let allUsers = [];
let acitveUsers = [];
let activeCalls = [];
let recentEvents = [];

ws.onmessage = function (event) {
    let data = JSON.parse(event.data);
    let ev = data.Event;
    recentEvents.push(data);
    console.log(recentEvents);
    let div = "";
    div = document.getElementById("recentActivites");
    if (recentEvents.length > 5) {
        div.getElementsByClassName('mactivity')[0].remove();
    }
    let nd = document.createElement('div');
    nd.classList.add('mactivity');
    let p = document.createElement('p');
    p.innerText = `Event: ${data.Event}  Channel: ${data.Channel}   Exten: ${data.Exten}`;
    nd.appendChild(p);
    div.appendChild(nd);

    switch (ev) {
        case "Newchannel":
            if (allUsers.indexOf(data.CallerIDNum) == -1 && activeCalls.indexOf(data.Uniqueid) == -1) {
                allUsers.push(data.CallerIDNum);
                acitveUsers.push(data.CallerIDNum);
                activeCalls.push(data.Uniqueid);
                div = document.getElementById('allUsers');
                div = div.getElementsByTagName('p')[1];
                div.innerText = allUsers.length;
                div = document.getElementById('activeUsers');
                div = div.getElementsByTagName('p')[1];
                div.innerText = acitveUsers.length;
                div = document.getElementById('activeCalls');
                div = div.getElementsByTagName('p')[1];
                div.innerText = activeCalls.length;
            }
            break;
        case "Hangup":
            let i = acitveUsers.indexOf(data.CallerIDNum);
            if (i > -1) {
                acitveUsers.splice(i, 1);
            }
            i = activeCalls.indexOf(data.Uniqueid);
            if (i > -1) {
                activeCalls.splice(i, 1);
            }
            div = document.getElementById('activeUsers');
            div = div.getElementsByTagName('p')[1];
            div.innerText = acitveUsers.length;
            div = document.getElementById('activeCalls');
            div = div.getElementsByTagName('p')[1];
            div.innerText = activeCalls.length;
            break;
        default:
            break;

    }
}