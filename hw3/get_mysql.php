<?php
$servername = "localhost";
$username = "cse20171645";
$password = "pw20171645";
$dbname = "db_cs20171645";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Select all data from the table
$sql = "SELECT * FROM MyHW2";
$result = $conn->query($sql);

// Check if there are results
if ($result->num_rows > 0) {
    // Fetch data and encode it as JSON
    $data = array();
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode($data);
} else {
    echo "No data found";
}

// Close connection
$conn->close();
?>