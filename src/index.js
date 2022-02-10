const products = [];
var errors = [];
$(document).ready(function () {
  $("#notification .error").empty();
  $("#notification .success").hide();
  $("#notification .error").hide();
  $("#add_product_form .update").hide();
  $("#add_product").click(function () {
    var pid = $("#pId").val();
    var pName = $("#productName").val();
    var pPrice = $("#productPrice").val();
    var qty = $("#productQuant").val();
    if (checkData(pid, pName, pPrice, qty)) {
      addItem(pid, pName, pPrice, qty);
      display();
    }
  });
});
function checkData(pid, name, price, quant) {
  if (pid == "") {
    $("#notification .error").show().fadeOut("slow");
    $("#notification .error").append("<p>pid is  null</p>");
    return false;
  } else if (name == "") {
    $("#notification .error").show().fadeOut("slow");
    $("#notification .error").append("<p>Name is  null</p>");
    return false;
  }
  if (price == "") {
    $("#notification .error").show().fadeOut("slow");
    $("#notification .error").append("<p>Price is  null</p>");
    return false;
  }
  if (quant == "") {
    $("#notification .error").show().fadeOut("slow");
    $("#notification .error").append("<p>Quantity is  null</p>");
    return false;
  }
  return true;
}

$("#update_product").on("click", function () {
  var pid = $("#pId").val();
  var pName = $("#productName").val();
  var pPrice = $("#productPrice").val();
  var qty = $("#productQuant").val();
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId == pid) {
      products[i].productName = pName;
      products[i].productPrice = pPrice;
      products[i].productQuantity = qty;
    }
  }
  display();
});

//Add the product in the array 
function addItem(pid, name, price, qty) {
  var arr = {
    productId: pid,
    productName: name,
    productPrice: price,
    productQuantity: qty,
  };
  products.push(arr);
}

//Dispay the result table
function display() {
  var nm =
    "<table><tr><th>SKU</th><th>Name</th><th>Price</th><th>Quantity</th><th>Action</th></tr>";
  for (let i = 0; i < products.length; i++) {
    nm =
      nm +
      "<tr><td>" +
      products[i].productId +
      "</td><td>" +
      products[i].productName +
      "</td><td>" +
      products[i].productPrice +
      "</td><td>" +
      products[i].productQuantity +
      "</td><td><a href='#' data-pid=" +
      products[i].productId +
      " class ='edit'>EDIT</a></td><td><a href='#' data-pid=" +
      products[i].productId +
      " class='delete'>DELETE</a></td></tr>";
  }
  nm += "</table>";
  $("#product_list").html(nm);
}

//Edit the row
$("body").on("click", ".edit", function () {
  $("#add_product_form .update").show();
  $("#add_product_form .submit").hide();
  $("#notification .success").hide();
  var id = $(this).data("pid");
  for (let i = 0; i < products.length; i++) {
    if (products[i].productId == id) {
      $("#pId").val(products[i].productId);
      $("#pName").val(products[i].productName);
      $("#pPrice").val(products[i].productPrice);
      $("#pQuant").val(products[i].productQuantity);
      console.log(products[i]);
      break;
    }
  }
});

//Delete the row
$("body").on("click", ".delete", function () {
  $("#add_product_form .update").hide();
  $("#add_product_form .submit").show();
  $("#notification .success").hide();
  var id = $(this).data("pid");
  console.log(id);
  var prod = [];
  for (let i = 0; i< products.length; i++) {
    if (products[i].productId == id) {
      prod = products[i];
    }
  }
  products.splice(products.indexOf(prod), 1);
  display();
});