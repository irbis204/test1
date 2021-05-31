<?php
ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
$uploadDir = $_SERVER['DOCUMENT_ROOT'].DIRECTORY_SEPARATOR.'uploads'.DIRECTORY_SEPARATOR;
$fileName = basename($_FILES['file']['name']);
$ext = pathinfo($fileName, PATHINFO_EXTENSION);
$name = pathinfo($fileName, PATHINFO_BASENAME);
$fileName = microtime() . '.' . $ext;
$uploadFile = $uploadDir . $fileName;

if (move_uploaded_file($_FILES['file']['tmp_name'], $uploadFile)) {
    $out = 'uploads/' . $fileName;
} else {
    $out = 'Error';
}

echo $out;


