<?php
$servername = "localhost";
$username = "cse20171645";
$password = "pw20171645";
$dbname = "db_cs20171645";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) 
{
  die("Connection failed: " . $conn->connect_error);
}

$id = $_GET['id'];
$password = $_GET['password'];
$email = $_GET['email'];
$address = $_GET['address'];
$phone = $_GET['phone'];
$school = $_GET['school'];
$major = $_GET['major'];
$interests = isset($_GET['interest']) ? implode(", ", $_GET['interest']) : "";

$sql = "INSERT INTO MyHW2 (id, pw, email, addr, phone, school, major, interests) VALUES ('$id', '$password', '$email', '$address', '$phone', '$school', '$major', '$interests')";

if ($conn->query($sql) === TRUE) 
{
  echo "New record added successfully";
} 
else 
{
  echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>