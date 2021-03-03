<?php
include '../connect.php';
if(!empty($_GET)){
    if($_GET['flag'] === 'data'){
        $query = "select * from tb_users";
        $result = $link->query($query);
        $result = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($result);
    }else if(!empty($_GET['id'])){
        $id = $_GET['id'];
        $query = "DELETE FROM tb_users WHERE id = '$id'";
        if($link->query($query)){
            echo 1;
        }
    }
   
}