<?php

//print_r( $_GET );
//$qty = $_GET['qty'];
//$pids = $_GET['pid'];
////could loop through and build up a query string
//print_r($qty);
//print_r($pids);

//Process some of the order here
$name = $_POST['name'];
$address = $_POST['address'];
$submit = $_POST['submit'];

if(isset($_POST['submit'])){
    $to = 'radmation@yahoo.com';
    $subject = 'New Order Placed Radmaiton\'s Pizza';
    $message = 'New customer named ' . $name . ' who lives at ' . $address . '';
    $from = "fakeemail@example.com";
    $headers = "From:" . $from;

    mail($to, $subject, $message, $headers);
    echo " MAIL SENT YYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYYL";

    sleep(100);

}

$form = <<<END_OF_FORM

<form method="post" action="buy.php">
Name: <input type="text name="name" value="$name" /> <br />
Address:  <input type="text name="address" value="$address"/><br />
<input type="submit" name="submit" value="submit" />
END_OF_FORM;

echo json_encode( $form );
