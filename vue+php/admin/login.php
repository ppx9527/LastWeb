<?php

include '../connect.php';
if (isset($_POST['user']) && isset($_POST['password'])) {  // 登录
    $user = $_POST['user'];
    $password = $_POST['password'];
    $query = "select id from tb_admin where admin_name = '$user'";
    $result = $link->query($query);
    $result = $result->fetch_row();
    if (!empty($result)){
        $query = "select id from tb_admin where admin_name = '$user' and password = '$password'";
        $result = $link->query($query);
        $result = $result->fetch_row();
        if (empty($result)){
            echo 1;  // 密码错误
        } else {
            setcookie('admin_id',$result[0],time() + 3600 * 24 * 30,'/res/admin/');
            echo 2;  // 密码正确
        }
    } else {
        echo 0; // 无此用户名
    }
    $link->close();
}