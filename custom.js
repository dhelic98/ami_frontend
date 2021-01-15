showDashboard = function () {
    console.log("Dashboard");
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