<?php

//Establishing connection
$connection = mysqli_connect('login.nsagroup14.com', 'user', 'PAFBAWUayq9U7oWz', 'nsa');

if (!$connection)
{
    echo 'Connection error: ' . mysqli_connect_error();
}

// String escape to prohibit injection attacks
$username = mysqli_real_escape_string($connection, $_POST['username']);
$password = mysqli_real_escape_string($connection, $_POST['password']);

// Hash the text using the sha256 algorithm, don't use password_hash as we cannot insert it into the database
$hashedpassword = hash('sha256', $password);

// Obtaining information from database
$sql = "SELECT password FROM login WHERE username = '$username'";
$result = mysqli_query($connection, $sql);
$logininfos = mysqli_fetch_assoc($result);

// If database query turns out to be empty
if(empty($logininfos))
{
     exit();
}

// Since the username is already verified while querying, now only need to compare password
// Once password is compared and is determined to be correct, generates token and returns link+token
// Expiry and delete function for token not implemented
if (hash_equals($hashedpassword, $logininfos['password']))
{
    $token = hash('md5', random_int(-2147483648, 214783647));
    $insertquery = "UPDATE `login` SET `token` = '$token' WHERE `login`.`username` = '$username' ";
    mysqli_query($connection, $insertquery);
    //account.nsagroup14.com/landing.html?token=
    echo "account.nsagroup14.com/index.html?token=" . $token;
}

// What happens when the password compared is returns false
else
{
    echo ''
}


?>




