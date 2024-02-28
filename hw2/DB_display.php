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

$id = isset($_GET['id']) ? $_GET['id'] : "";
$email = isset($_GET['email']) ? $_GET['email'] : "";
$addr = isset($_GET['address']) ? $_GET['address'] : "";
$phone = isset($_GET['phone']) ? $_GET['phone'] : "";
$school = isset($_GET['school']) ? $_GET['school'] : "";
$major = isset($_GET['major']) ? $_GET['major'] : "";
$date = isset($_GET['date']) ? $_GET['date'] : "";

$sql = "SELECT * FROM MyHW2 WHERE 1";

if (!empty($id)) 
{
    $sql .= " AND id = '$id'";
}

if (!empty($email)) 
{
    $sql .= " AND email = '$email'";
}

if (!empty($addr)) 
{
    $sql .= " AND addr = '$addr'";
}

if (!empty($phone)) 
{
    $sql .= " AND phone = '$phone'";
}

if (!empty($school)) 
{
    $sql .= " AND school = '$school'";
}

if (!empty($major)) 
{
    $sql .= " AND major = '$major'";
}

if (!empty($date)) 
{
    $sql .= " AND reg_date < '$date'";
}

$result = $conn->query($sql);

if ($result->num_rows > 0) 
{
    echo '<table>';
    echo '<tr>';
    echo '<th>ID</th>';
    echo '<th>Email</th>';
    echo '<th>Address</th>';
    echo '<th>Phone</th>';
    echo '<th>School</th>';
    echo '<th>Major</th>';
    echo '<th>Interests</th>';
    echo '</tr>';

    echo '<hr>';

    while ($row = $result->fetch_assoc()) 
    {
        echo '<tr>';
        echo '<td>' . $row['id'] . '</td>';
        echo '<td>' . $row['email'] . '</td>';
        echo '<td>' . $row['addr'] . '</td>';
        echo '<td>' . $row['phone'] . '</td>';
        echo '<td>' . $row['school'] . '</td>';
        echo '<td>' . $row['major'] . '</td>';
        echo '<td>' . $row['interests'] . '</td>';
        echo '</tr>';
    }

    echo '</table>';
} 
else 
{
    echo "No results found.";
}


$conn->close();
?>
