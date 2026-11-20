var loginEmail = sessionStorage.getItem("bill_auth")
var allTag = document.getElementsByClassName("hover_effect");
for(i=0;i<allTag.length;i++) {
  allTag[i].onmouseover = function() {
    this.className="animate__animated animate__zoomIn";
  }
  allTag[i].onmouseleave = function() {
    this.className="";
  }

}

function openCompanyModal() {

  var check = localStorage.getItem(loginEmail+"_cmp");
  if(check != null) {
    window.location="billing.html";
  } else {
    var blur = document.getElementById("cmp_blur");
    var box = document.getElementById("cmp_modal");
    box.style.display="block";
    blur.className="animate__animated animate__slideInDown";
  }

}

function closeCompanyModal() {
  var blur = document.getElementById("cmp_blur");
  var box = document.getElementById("cmp_modal");
  blur.className="animate__animated animate__slideOutUp";
  setTimeout(function(){
      box.style.display="none";
  },600);
}

var cmp_form = document.getElementById("cmp_form");
cmp_form.onsubmit = function(event) {
  event.preventDefault();
  var allrequired = document.getElementsByClassName("cmp_require");
  var tmp=[];
  for(i=0;i<allrequired.length;i++) {
    var inputVal = allrequired[i].value;
    if(inputVal!="") {
      tmp.push(inputVal);
      if(allrequired[i].name=="financial_year") {
        validateFinancial(allrequired[i]);
      }
    } else {
      var currentInput = allrequired[i];
      var span = document.createElement("SPAN");
      span.innerHTML = "this field is required";
      span.style.color="red";
      if(currentInput.nextSibling.nodeName=="SPAN") {
        currentInput.nextSibling.remove();
      }
      currentInput.after(span);
    }

    allrequired[i].oninput = function() {
      if(this.value != "") {
        if(this.nextSibling.nodeName=="SPAN") {
          this.nextSibling.remove();
        }
      }
    }

  }

  var allSpan = cmp_form.getElementsByTagName("SPAN");
  console.log(allSpan);
  if(allSpan.length==0) {
    var obj = {
      cmp_name:document.getElementById("company_name").value,
      cmp_slug:document.getElementById("company_slug").value,
      cmp_email:document.getElementById("company_email").value,
      cmp_founder:document.getElementById("company_founder").value,
      cmp_founder_contact:document.getElementById("company_founder_contact").value,
      cmp_founder_email:document.getElementById("company_founder_email").value,
      cmp_city:document.getElementById("company_city").value,
      cmp_state:document.getElementById("company_state").value,
      cmp_country:document.getElementById("company_country").value,
      cmp_pincode:document.getElementById("company_pincode").value,
      cmp_established:document.getElementById("company_established").value,
      cmp_financial:document.getElementById("company_financial").value,
    };
    var cmp_string = JSON.stringify(obj);
    localStorage.setItem(loginEmail+"_cmp",cmp_string);
    window.alert("company created");
  }

}


function validateFinancial(input) {
  var userdate = input.value;
  var userSelectedDate = new Date(userdate);
  var mm = userSelectedDate.getMonth()+1;
  var dd = userSelectedDate.getDate();
  var yy = userSelectedDate.getFullYear();
  var currentDate = new Date();
  var currentYear = currentDate.getFullYear();

  // console.log("day",dd);
  // console.log("month",mm);
  // console.log("year",yy);
  var span = document.createElement("SPAN");
  if(mm==3) {
    if(yy>currentYear) {
      span.innerHTML="select correct year";
    } else {
      if(input.nextSibling!=null) {
        input.nextSibling.remove();
      }
    }
  } else {
    span.innerHTML="select correct month";
  }

  if(input.nextSibling !=null) {
     if(input.nextSibling.nodeName=="SPAN") {
          input.nextSibling.remove();
     }
  }
  if(span.innerHTML!="") {
      input.after(span);
  }

}



function checkCompany() {
  var checkcmp = localStorage.getItem(loginEmail+"_cmp");
  var icon = document.getElementById("cmp_icon");
  if(checkcmp != null) {
    icon.className="fa fa-file";
    icon.onclick = function() {
      var input = document.createElement("INPUT");
      input.type="file";
      input.click();
      input.onchange = function() {
        var file = input.files[0];
        if(file.type=="image/jpg" || file.type=="image/jpeg"
        || file.type=="image/png") {
          var reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = function() {
            var binary = reader.result;
            localStorage.setItem(loginEmail+"_cmp_logo",binary);
            icon.style.backgroundImage=`url(${binary})`;
            icon.style.backgroundSize="cover";
            icon.className="";
          }
        } else {
          window.alert("upload image file only");
        }
      }
    }

    var cmp_box = document.getElementById("cmp_msg");
    var obj = JSON.parse(checkcmp);
    var cmp_name = obj.cmp_name;
    cmp_box.innerHTML=cmp_name;
  }

  var checklogo = localStorage.getItem(loginEmail+"_cmp_logo");
  if(checklogo != null) {
    icon.style.backgroundImage=`url(${checklogo})`;
    icon.style.backgroundSize="cover";
    icon.className="";
  }
}

checkCompany();
