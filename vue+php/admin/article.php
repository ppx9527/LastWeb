<?php

include '../connect.php';
if (isset($_POST['admin'])){ // 插入文章
    $id= $_POST['admin'];
    $title = $_POST['title'];
    $content = $_POST['content'];
    $ctime = $_POST['ctime'];
    $query = "INSERT INTO tb_article (
	title,
	content,
	admin_id,
	ctime
)
VALUE
	(
		'$title',
		'$content',
		'$id',
		'$ctime'
	)";
    if ($link->query($query)){
        echo 1;
    } else {
        echo mysqli_error($link);
    }
} 