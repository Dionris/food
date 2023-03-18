<?php
$_POST = json_decode(file_get_contents("php://input"), true); // для получения JSON днных
echo var_dump($_POST);