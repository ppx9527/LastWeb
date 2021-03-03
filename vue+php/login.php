<?php
include 'connect.php';
if (isset($_POST['sex'])){ // 更新个人资料
    $user = $_POST['user_name'];
    $email = $_POST['email'];
    $sex = $_POST['sex'];
    $age = $_POST['age'];
    $sign = $_POST['sign'];
    $query = "update tb_users set user_name = '$user',email = '$email',sex = '$sex',age = '$age',sign = '$sign' where user_name = '$user'";
    if ($link->query($query)){
        echo 1;// 更新成功
    } else {
        echo 0;// 更新失败
    }
    $link->close();
} elseif (isset($_POST['user']) && isset($_POST['password']) && isset($_POST['email'])){  // 注册
    $user = $_POST['user'];
    $password = $_POST['password'];
    $email = $_POST['email'];
    $query = "select user_name from tb_users where user_name = '$user'";
    $result = $link->query($query);
    $result = $result->fetch_row();
    if (empty($result)){
        $query = "insert into tb_users (user_name,password,email) value ('$user','$password','$email')";
        if ($link->query($query)) {
            echo 1; // 注册成功
        } else {
            echo 2; // 注册失败
        }
    } else {
        echo 0;  // 已有此用户名
    }
    $link->close();
} elseif (isset($_POST['user']) && isset($_POST['password'])) {  // 登录
    $user = $_POST['user'];
    $password = $_POST['password'];
    $query = "select user_name from tb_users where user_name = '$user'";
    $result = $link->query($query);
    $result = $result->fetch_row();
    if (!empty($result)){
        $query = "select id from tb_users where user_name = '$user' and password = '$password'";
        $result = $link->query($query);
        $result = $result->fetch_row();
        if (empty($result)){
            echo 1;  // 密码错误
        } else {
            setcookie('user',$user,time() + 3600 * 24 * 30,'/res/');
            setcookie('user_id',$result[0],time() + 3600 * 24 * 30,'/res/');
            echo 2;  // 密码正确
        }
    } else {
        echo 0; // 无此用户名
    }
    $link->close();
} elseif (isset($_COOKIE['user'])){
    $user = $_COOKIE['user'];
    $query = "select id,user_name,head_portrait,email,sex,age,sign from tb_users where user_name = '$user'";
    $result = $link->query($query);
    $result = $result->fetch_assoc();
    echo json_encode($result);
} else {
    echo '没有登录啊！蛇皮怪';
}