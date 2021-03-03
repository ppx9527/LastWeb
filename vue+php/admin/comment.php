<?php
include '../connect.php';
if (!empty($_GET)) {
    $query = "SELECT * FROM tb_comment";
    $result = $link->query($query);
    $result = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
}