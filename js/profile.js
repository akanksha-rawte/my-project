var loginCheck = sessionStorage.getItem("bill_auth");
if(loginCheck==null) {
  window.location="../index.html";
}

var userData = localStorage.getItem(loginCheck);
var userObj = JSON.parse(userData);
var fullname = userObj.fullname;
var username = document.getElementById("username");
username.innerHTML="WELCOME "+fullname.toUpperCase();

function logoutUser() {
  var text = window.prompt("Enter logout to logout");
  if(text=="logout") {
    sessionStorage.removeItem("bill_auth");
    window.alert("Logout success");
    window.location="../index.html";
  }
}

function uploadProfile(){
  var input = document.createElement("INPUT");
  input.type="file";
  input.click();
  input.onchange = function() {
    var file = input.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function() {
      var binary = reader.result;
      var email = sessionStorage.getItem("bill_auth");
      localStorage.setItem(email+"_profile",binary);
      var circleBox = document.getElementById("userpic");
      circleBox.style.backgroundImage=`url(${binary})`;
      circleBox.style.backgroundSize="cover";
    }
  }
}


function readProfile() {
  var email = sessionStorage.getItem("bill_auth");
  var binary = localStorage.getItem(email+"_profile");
  if(binary!=null) {
    var box = document.getElementById("userpic");
    box.style.backgroundImage=`url(${binary})`;
    box.style.backgroundSize="cover";
  }
}

readProfile();
