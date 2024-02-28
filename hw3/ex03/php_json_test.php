<?php
header('Content-Type: text/html');

//json encode
$json = json_encode(array(
    array('name' => 'Kim', 'grade' => '4.4'),
    array('name' => 'Park', 'grade' => '3.7'),
    array('name' => 'Lee', 'grade' => '4.0')
));

echo $json;

//json decode
$student = json_decode($json);

foreach($student as $s)
{
    echo "<br/>".$s->name." : ".$s->grade;
}

// echo "<br/><br/>";
// echo $student[1]->name." : ".$student[1]->grade;
// echo "<br/>";
// echo $student[2]->name." : ".$student[2]->grade;
?>