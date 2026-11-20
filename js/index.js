function openSection() {
  var box = document.getElementById("left_section");
  box.style.width="300px";
  box.style.padding="10px";
}

function closeLeftSection() {
  var box = document.getElementById("left_section");
  box.style.width="0px";
  box.style.padding="0px";
}

function registerUser(e) {
  e.preventDefault();
  var msg = document.getElementById("registerMsg");
  var allInput = document.getElementsByClassName("requireInput");
  var len = allInput.length;
  var tmp = [];
  for(i=0;i<len;i++) {
    var inputVal = allInput[i].value;
    if(inputVal != "") {
        tmp.push(inputVal);
    }
  }
  if(tmp.length==len) {
    if(allInput[3].value==allInput[4].value) {
      var check = localStorage.getItem(allInput[1].value);
      if(check == null) {
        var userObj = {
          fullname:allInput[0].value,
          email:allInput[1].value,
          mobile:allInput[2].value,
          password:allInput[3].value
        };
        var userStr = JSON.stringify(userObj);
        localStorage.setItem(allInput[1].value,userStr);
        window.alert("Registration success try to login");
      } else {
        window.alert("user exists!!");
      }

    } else {
      msg.innerHTML="password and confirm password should be same";
      setTimeout(function(){
        msg.innerHTML="";
      },5000)
    }
  } else {
    msg.innerHTML="All field is required !!";
    setTimeout(function(){
      msg.innerHTML=""
    },5000);


  }
}


// login code start from here
function loginUser(e) {
  e.preventDefault();
  var email = document.getElementById("login_email").value;
  var pass = document.getElementById("login_password").value;
  var data = localStorage.getItem(email);
  if(data==null) {
    window.alert("user not registered");
  } else {
    var obj = JSON.parse(data);
    var registerPass = obj.password;
    if(pass==registerPass) {
      sessionStorage.setItem("bill_auth",email);
      window.location="pages/profile.html";
    } else {
      window.alert("wrong password");
    }
  }
}
