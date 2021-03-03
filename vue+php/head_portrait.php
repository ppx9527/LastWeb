<?php
include 'connect.php';
if (isset($_FILES['file'])){
    $root_dir ="upload/";
    $filename =  $_FILES['file']['name'];
    $upload_file = $root_dir . $filename;
    $user = $_COOKIE['user'];
    if (move_uploaded_file($_FILES['file']['tmp_name'], $upload_file)) { // 如果文件存在会覆盖
        $query = "update tb_users set head_portrait = '$upload_file' where user_name = '$user'";
        if ($link->query($query)) {
            echo 1;
        }
    }
}
$link->close();