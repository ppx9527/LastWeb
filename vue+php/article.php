<?php

include 'connect.php';
if (!empty($_GET)) { // 获取单个文章
    if($_GET['flag'] == 'get-article'){
        $id = $_GET['id'];
        $user_id = $_GET['user_id'];
        $query = "SELECT
	art.id,
	art.title,
	art.content,
	art.ctime,
	admin_name,
    goods,
    COUNT(tb_good.id) AS is_good
FROM
	tb_article AS art
INNER JOIN tb_admin ON art.admin_id = tb_admin.id 
LEFT JOIN tb_good ON tb_good.article_id = art.id AND tb_good.user_id = '$user_id'
where art.id = '$id'";
        $result = $link->query($query);
        $result = $result->fetch_all(MYSQLI_ASSOC);
        $sum = $result;
        // 获取评论
        $query = "SELECT
	user_name,
	content,
	ctime,
	head_portrait
FROM
	tb_comment
JOIN tb_users ON tb_comment.user_id = tb_users.id
WHERE
	article_id = '$id'
    order by
        ctime desc";
        $result = $link->query($query);
        // echo mysqli_error($link);
        $result = $result->fetch_all(MYSQLI_ASSOC);
        array_push($sum,$result);
        echo json_encode($sum);
    }else if($_GET['flag'] == 'add-good'){ // 点赞
        $id = $_GET['id'];
        $user_id = $_GET['user_id'];
        $ctime = $_GET['ctime'];
        $query = "INSERT INTO tb_good (article_id,user_id,ctime) VALUES ('$id','$user_id','$ctime')";
        $query1 = "UPDATE tb_article SET goods = goods + 1 WHERE id = '$id'";
        if(!($link->query($query) && $link->query($query1))){
            echo mysqli_error($link);
        }
    }
}else if (!empty($_POST)) { // 评论
    $id = $_POST['id'];
    $user_id = $_POST['user_id'];
    $ctime = $_POST['ctime'];
    $content = $_POST['content'];
    $query = "INSERT INTO tb_comment (article_id,user_id,ctime,content) VALUES ('$id','$user_id','$ctime','$content')";
    if ($link->query($query)) {
        echo 1;
    }else {
        echo mysqli_error($link);
    }
}else{ // 获取所有文章
    $query = "SELECT
	art.id,
	art.title,
	art.content,
	art.ctime,
	COUNT(com.id) AS comments,
	admin_name,
    goods
FROM
	tb_article AS art
LEFT JOIN tb_comment AS com ON art.id = com.article_id
INNER JOIN tb_admin ON art.admin_id = tb_admin.id
GROUP BY
	art.id
ORDER BY
	art.ctime DESC";
    $result = $link->query($query);
    if(!empty($result)){
        $result = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($result);
    }else{
        echo mysqli_error($link);
    }
}
$link->close();