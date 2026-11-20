var loginEmail = sessionStorage.getItem("bill_auth");
function readCompany() {
  var cmp = localStorage.getItem(loginEmail+"_cmp");
  if(cmp != null) {
    var cmp_heading = document.getElementById("cmp_name");
    var obj = JSON.parse(cmp);
    var cmpname = obj.cmp_name;
    cmp_heading.innerHTML=cmpname.toUpperCase();
  }

 var cmplogo = localStorage.getItem(loginEmail+"_cmp_logo");
 var cmpbox = document.getElementById("cmp_logo");
 if(cmplogo !=null) {
   cmpbox.style.backgroundImage=`url(${cmplogo})`;
   cmpbox.style.backgroundSize="cover";
 }


}

readCompany();

function handleUnit() {
  var box = document.getElementById("unit_box");
  box.style.display="block";
}

function closeUnit() {
  var box1 = document.getElementById("unit_box");
  box1.style.display="none"
}


function saveUnit(e) {
  e.preventDefault();
  var form = document.getElementById("unit_form");
  var short = document.getElementById("unit_short_name").value;
  var full = document.getElementById("unit_full_name").value;
  var obj  = {
    shorname:short,
    fullname:full
  };
  var str = JSON.stringify(obj);
  localStorage.setItem(loginEmail+"_unit_"+short,str);
    Swal.fire({
      title: "Unit notification",
      text: "Unit created",
      icon: "success"
    });
    form.reset();
}


function openTax() {
  var box = document.getElementById("tax_container");
  box.style.display="block";
}

function closeTax() {
  var box = document.getElementById("tax_container");
  box.style.display="none";
}

function saveTax(event) {
  event.preventDefault();
  var name = document.getElementById("tax_name").value;
  var per = document.getElementById("tax_percentage").value;
  if(name.match("_tax") != null) {
    var alpha = /[A-Z]/i;
    var checkalpha = per.match(alpha);
    if(checkalpha==null) {
      var specialChars = /[-’/`~!#*$@_+=.,^&(){}[\]|;:”<>?\\]/g;
      var checkSpecial = per.match(specialChars);
      if(checkSpecial==null) {
        if(per.match("%") !=null) {
          var tax_obj = {
            tax_name:name,
            tax_per:per.replace("%","")
          };
          var tax_string = JSON.stringify(tax_obj);
          localStorage.setItem(loginEmail+"_"+name,tax_string);
          window.alert("tax created");
        } else {
          alert("use % symbols");
        }
      } else {
        alert("special Chars not allowed");
      }
    } else {
      alert("alpha a to z not acceptable");
    }
  } else {
    window.alert("use tax name like gst_tax");
  }
}


function addItem() {
  var table = document.getElementById("productTable");
  var tr = document.createElement("TR");
  tr.align="center";
  var itemtd = document.createElement("TD");
  var itemInput = document.createElement("INPUT");
  itemInput.className="item_input";
  itemtd.append(itemInput);

  var qtytd = document.createElement("TD");
  var qtyInput = document.createElement("INPUT");
  qtytd.append(qtyInput);

  var pricetd = document.createElement("TD");
  var priceInput = document.createElement("INPUT");
  pricetd.append(priceInput);

  var amounttd = document.createElement("TD");
  var amountInput = document.createElement("INPUT");
  amountInput.className="item_amount";
  amounttd.append(amountInput);

  var actionTd = document.createElement("TD");
  var button = document.createElement("BUTTON");
  button.id = "delete_item_btn";
  var icon = document.createElement("I");
  icon.className="fa fa-trash";
  button.append(icon);
  actionTd.append(button);
  tr.append(itemtd);
  tr.append(qtytd);
  tr.append(pricetd);
  tr.append(amounttd);
  tr.append(actionTd);
  table.append(tr);
  button.onclick = function() {
    var userType = window.prompt("Type delete to delete");
    if(userType=="delete") {
      this.parentElement.parentElement.remove();
      totalCalculation();
      readTax();
      calculateDues();
    }
  }

  // quantity coding start
  qtyInput.oninput = function() {
    var qty = this.value;
    var currentTr = this.parentElement.parentElement;
    var allInput = currentTr.getElementsByTagName("INPUT");
    var price = allInput[2].value;
    var amt = qty*price;
    allInput[3].value=amt;
    totalCalculation();
    readTax();
  }

  // price coding start
  priceInput.oninput = function() {
    var price = this.value;
    var currentTr = this.parentElement.parentElement;
    var allInput = currentTr.getElementsByTagName("INPUT");
    var qty = allInput[1].value;
    var amt = qty*price;
    allInput[3].value=amt;
    totalCalculation();
    readTax();
  }


}

function totalCalculation() {
  var total = 0;
  var allAmount = document.getElementsByClassName("item_amount");
  var totalTag = document.getElementById("total");
  for(i=0;i<allAmount.length;i++) {
    total = total+Number(allAmount[i].value);
  }
  totalTag.innerHTML=total;
}

var customer_email = document.getElementById("customer_email");
var customer_mobile = document.getElementById("customer_mobile");
var customer_name = document.getElementById("customer_name");
customer_name.onkeydown = function(event) {
  if(event.keyCode==13) {
    customer_email.focus();
  }
}

customer_email.onkeydown = function(event) {
  if(event.keyCode==13) {
    customer_mobile.focus();
  }
}

function readTax() {
  var len = localStorage.length;
  var tax_name_box = document.getElementById("tax_name_box");
  var tax_per_box = document.getElementById("tax_per_box");
  tax_name_box.innerHTML="";
  tax_per_box.innerHTML="";
  var total = document.getElementById("total").innerHTML;
  var subtotal = total;
  for(i=0;i<len;i++) {
    var keyName = localStorage.key(i);
    if(keyName.match("_tax") !=null && keyName.match(loginEmail) !=null) {
      var stringData = localStorage.getItem(keyName);
      var objData = JSON.parse(stringData);
      var per = (total*objData.tax_per)/100;
      var taxNameDesign = `<p>${objData.tax_name} ${objData.tax_per} %</p>`;
      var taxPerDesign = `<p taxname="${objData.tax_name}"
                           taxper="${objData.tax_per}"
                           taxcal="${per}">
                           <i class="fa fa-rupee"></i> ${per}
                           </p>`;
      tax_name_box.innerHTML+=taxNameDesign;
      tax_per_box.innerHTML+=taxPerDesign;
      subtotal = Number(subtotal)+Number(per);
    }
  }
  var subtotalTag = document.getElementById("subtotal");
  subtotalTag.innerHTML=subtotal;
}

readTax();

function calculateDues() {
  var duesTag = document.getElementById("dues");
  var paidBalance = Number(document.getElementById("paid_input").value);
  var subtotal = Number(document.getElementById("subtotal").innerHTML);
  var dues = subtotal-paidBalance;
  duesTag.innerHTML=dues;
}


function openBill() {
  var currentDate = document.getElementById("currentDate");
  var box = document.getElementById("blur_box");
  box.style.display="block";
  var date = new Date();
  var mm = date.getMonth()+1;
  mm = mm.toString();
  var dd = date.getDate();
  dd = dd.toString();
  var yy = date.getFullYear();
  if(mm.length==1) {
    mm = "0"+mm;
  }
  if(dd.length==1) {
    dd = "0"+dd;
  }
  currentDate.innerHTML=`${dd}-${mm}-${yy}`;

  var cmpdata = localStorage.getItem(loginEmail+"_cmp");
  var obj = JSON.parse(cmpdata);
  var cmpname = obj.cmp_name;
  var len = localStorage.length;
  var isFound=false;
  var invoicekey;
  var allInvoice=[];
  for(i=0;i<len;i++) {
    var keyName = localStorage.key(i);
    if(keyName.match(cmpname+"-invoice") !=null) {
      isFound=true;
      var numkey = keyName.replace(cmpname+"-invoice-","");
      allInvoice.push(numkey);
    }
  }
  var bigNumber=0;
  for(i=0;i<allInvoice.length;i++) {
    var singleNum = Number(allInvoice[i]);
    if(singleNum>bigNumber) {
      bigNumber=singleNum;
    }
  }


  if(isFound != true) {
    invoicekey = cmpname+"-invoice-101";
  } else {
    invoicekey = cmpname+"-invoice-"+(bigNumber+1);
  }

  var invoiceTag = document.getElementById("invoice_num");
  invoiceTag.innerHTML=invoicekey;

var binary = localStorage.getItem(loginEmail+"_cmp_logo");
if (binary !=null) {
  var bill_logo = document.getElementById("cmp_bill_logo");
  bill_logo.style.backgroundImage=`url(${binary})`;
  bill_logo.style.backgroundSize="cover";
}
var cmp_data = localStorage.getItem(loginEmail+"_cmp");
if (cmp_data !=null) {
  var cmp_address = document.getElementById("cmp_address");
var cmp_obj = JSON.parse(cmp_data);
var cname = cmp_obj.cmp_name;
var ccity = cmp_obj.cmp_city;
var cstate = cmp_obj.cmp_state;
var ccountry = cmp_obj.cmp_country;
var cpincode = cmp_obj.cmp_pincode;
var cemail = cmp_obj.cmp_email;
var ccontact = cmp_obj.cmp_founder_contact;
cmp_address.innerHTML=`<div style="padding-left:10px;text-align:center;">
                                     <b style="margin-left:50px;">${cname.toUpperCase()}</b>
                                     <br/>${ccity} ${cstate} ${ccountry} ${cpincode}
                                    <br/>phone  ${ccontact}
                                      <br/>email  ${cemail} </div>`;

          }
}

function closeBill() {
  var box = document.getElementById("blur_box");
  box.style.display="none";
}


function saveBill() {
  var cus_name = document.getElementById("customer_name").value;
  var cus_email = document.getElementById("customer_email").value;
  var cus_mobile = document.getElementById("customer_mobile").value;
  var cus_address = document.getElementById("customer_address").value;
  var allItems = document.getElementsByClassName("item_input");
  var itemLen = allItems.length;
  var allProduct=[];
  for(i=0;i<itemLen;i++) {
    var currentTr = allItems[i].parentElement.parentElement;
    var allProductInput = currentTr.getElementsByTagName("INPUT");
    var itemname = allProductInput[0].value;
    var qty = allProductInput[1].value;
    var price = allProductInput[2].value;
    var amount = allProductInput[3].value;
    var productObj = {
      name:itemname,
      qty:qty,
      price:price,
      amount:amount
    };
    allProduct.push(productObj);
  }
  var total = document.getElementById("total").innerHTML;
  var subtotal = document.getElementById("subtotal").innerHTML;
  var paid = document.getElementById("paid_input").value;
  var dues = document.getElementById("dues").innerHTML;
  var billNum = document.getElementById("invoice_num").innerHTML;
  var billdate = document.getElementById("currentDate").innerHTML;
  var td = document.getElementById("tax_per_box");
  var allTax = td.getElementsByTagName("p");
  var taxdata = [];
  for(i=0;i<allTax.length;i++){
    var taxname = allTax[i].getAttribute("taxname");
    var taxper = allTax[i].getAttribute("taxper");
    var taxcal = allTax[i].getAttribute("taxcal");
var taxobj = {
  tax_name:taxname,
  tax_per:taxper,
  tax_cal:taxcal
}
taxdata.push(taxobj);
  }
  var billObj = {
    bill_date:billdate,
    cus_name:cus_name,
    cus_email:cus_email,
    cus_mobile:cus_mobile,
    cus_address:cus_address,
    products:allProduct,
    total:total,
    subtotal:subtotal,
    paid:paid,
    dues:dues,
    taxes:taxdata
  };
  var billStr = JSON.stringify(billObj);
  localStorage.setItem(billNum,billStr);
  alert("bill Created");
  window.location=location.href;
}

function openAllBills() {
  var box = document.getElementById("all_bill_container");
  box.style.display="block";
}
function closeAllBills() {
  var box = document.getElementById("all_bill_container");
  box.style.display="none";
}

function searchInvoice() {
  var invoiceNum = document.getElementById("search_invoice").value;
  var check = localStorage.getItem(invoiceNum);
  if (check != null) {
    var result = document.getElementById("bill_table");
    result.innerHTML=`<tr align="center">
    <td width="14.28%">invoice Number</td>
    <td width="14.28%">customer name</td>
    <td width="14.28%">customer email</td>
    <td width="14.28%">customer mobile</td>
    <td width="14.28%">customer dues</td>
    <td width="14.28%">paid dues</td>
    <td width="14.28%">all details</td>
    </tr>`;
    var obj = JSON.parse(check);
    var name = obj.cus_name;
    var email = obj.cus_email;
    var mobile = obj.cus_mobile;
    var dues = obj.dues;
    var design = `<tr>
    <td>${invoiceNum}</td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${mobile}</td>
    <td>${dues}</td>
    <td><input/></td>
    <td><button class="close_bill_details">All data</button></td>
    </td>`;
    result.innerHTML+=design;

    var btn = document.getElementsByClassName("close_bill_details");
    for(i=0;i<btn.length;i++) {
      btn[i].onclick = function() {
        var box1 = document.getElementById("all_bill_container");
        box1.style.display="none";
        openBill();
        document.getElementById("invoice_num").innerHTML=invoiceNum;
        var cus_name_input = document.getElementById("customer_name");
          var cus_email_input = document.getElementById("customer_email");
            var cus_mobile_input = document.getElementById("customer_mobile");
              var cus_address_input = document.getElementById("customer_address");

              var obj = JSON.parse(check);
              var name = obj.cus_name;
              var email = obj.cus_email;
              var mobile = obj.cus_mobile;
              var address = obj.cus_address;
              var total = obj.total;
              document.getElementById("total").innerHTML=total;

           cus_name_input.value=name;
           cus_email_input.value=email;
           cus_mobile_input.value=mobile;
           cus_address_input.value=address;

              var table = document.getElementById("productTable");
              table.innerHTML=`<tr align="center">
                <td width="20%">Item</td>
                <td width="20%">Qty</td>
                <td width="20%">price</td>
                <td width="20%">Amount</td>
                <td width="20%">Action</td>
             </tr>`;
             var products = obj.products;
             for (i=0;i<products.length;i++) {
               addItem();
             }
          var allItemsInput = document.getElementsByClassName("item_input");
          for(i=0;i<products.length;i++) {
            var singleTag = allItemsInput[i];
            var currentTr = singleTag.parentElement.parentElement;
            var allTrInput = currentTr.getElementsByTagName("INPUT");
            var currentobj = products[i];
            allTrInput[0].value=currentobj.name;
            allTrInput[1].value=currentobj.qty;
            allTrInput[2].value=currentobj.price;
            allTrInput[3].value=currentobj.amount;
        }

    var subtotal = obj.subtotal;
    var dues = obj.dues;
    var paid = obj.paid;
    var paidInput = document.getElementById("paid_input");
    paidInput.value=paid;
    document.getElementById("dues").innerHTML=dues;
    document.getElementById("subtotal").innerHTML=subtotal;
    readTax();
}
}
}
}
