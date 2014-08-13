
navigator.geolocation.getCurrentPosition( function (pos){
    var lat = pos.coords.latitude;
    var lng = pos.coords.longitude;
    //console.log( lat + " " + lng);
    // saddr=starting destination &daddr=destination address
    //http://maps.google.com/maps?daddr=4319+N+Argonne+Rd,+Spokane,+WA+99212&saddr=

    var map = '<iframe src="https://www.google.com/maps/embed?pb=!1m27!1m12!1m3!1d86035.3689501094!2d-117.38502106665194!3d47.6338035969287!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m12!1i0!3e6!4m3!3m2!1d47.65878!2d-117.426047!4m5!1s0x549e1fc00985bf5f%3A0x2cd1556d5a46c3f1!2s4319+N+Argonne+Rd%2C+Spokane%2C+WA+99212!3m2!1d' + lat + '!2d' + lng + '!5e0!3m2!1sen!2sus!4v1406836630322" width="360" height="360" frameborder="0" style="border:0"></iframe>';

    //var url = '<a href="http://maps.google.com/maps?daddr=4319+N+Argonne+Rd,+Spokane,+WA+99212&saddr=' +lat+','+lng +'">Your Location</a>';
    //$("#url").append(url); // .append()  and .html() both work   .text() treats it as text not html tag
    $("#map").html(map);
});

var cart = [];

$(document).ready(function () {
    //add a buy button to each product
    $('div[data-product]').each( function () {
        $(this).append('<button class="btnCart">Add To Cart</button>');
    });
    $(".btnCart").on("click", function(event){
        var pid = $(this).parent().parent().data("product");
        console.log(pid);
        if( cart[pid] ){
            cart[pid].qty += 1;
        } else {
            cart[pid] = new Object(); //created a new object
            cart[pid].qty = 1; //create properties for the new object
            cart[pid].pid = pid;
            cart[pid].name = $(this).parent().siblings("span").data("name");
            cart[pid].price = $(this).parent().siblings("span").next().data("price");
        }
        displayCart();

    });

    $("#buy").on("click", function (event) {
        var buyUrl = "";
        for(var item in cart){
            buyUrl += "&pid[]=" + item + "&qty[]=" + cart[item].qty;
        }
        $.getJSON('buy.php?' + buyUrl, function(data){
            $("#cart").append(data);
        });
        console.log("http://cis217-4.sortingsolutionsusa.com/buy.php?" + buyUrl);
        $("#buy").parent().hide();
    });

    $("#save_order").on("click", function(event){ // really a click event
           //CAN ONLY SAVE STRING
        var cartStr = "[";
        for(var item in cart){
            cartStr += JSON.stringify(cart[item]) + ",";
        }
        cartStr = cartStr.slice(0,-1); // strip last comma
        cartStr += "]";
        localStorage['cart'] = cartStr;
        console.log(cartStr);
    });
    $("#load_order").on("click", function(event){ // really a click event
        cart = [];
        var obj = JSON.parse( localStorage['cart']);
        for(var item in obj){
            pid = obj[item].pid;
            cart[pid] = obj[item];
        }
        displayCart();
    });

});

function displayCart(){
    var myCart = $("#cart");
    myCart.html(""); // sets html to nothing
    var grandTotal = 0;
    var totalQty = 0;

    for( var item in cart){
        var qty = cart[item].qty;
        var price = cart[item].price;
        var subtotal = qty * price;
        grandTotal += subtotal;
        totalQty += cart[item].qty;
        myCart.append('<p>' + qty + " " + cart[item].name  + 'Subtotal: $' + subtotal.toFixed(2) + '</p>');
    }
    myCart.append('<p>' + 'Grand Total $: ' + grandTotal.toFixed(2) + '</p>');
    $(".add_order").html(totalQty);
}
