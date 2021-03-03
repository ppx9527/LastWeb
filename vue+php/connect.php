<?php
$link = new mysqli('localhost','root','root','test');
if ($link->connect_errno){
    die('数据库连接失败：'.$link->connect_error);
}
$link->set_charset('utf8');