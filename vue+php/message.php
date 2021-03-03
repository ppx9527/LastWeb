<?php
include 'connect.php';
if (isset($_POST['user_id'])){
    $id = $_POST['user_id'];
    $content = $_POST['content'];
    $ctime = $_POST['ctime'];
    $query = "insert into tb_comment (user_id,content,ctime) value ('$id','$content','$ctime')";
    if ($link->query($query)) {
        echo 1;
    }
} else {
    $query = "SELECT
	tb_users.user_name,
	ctime,
	head_portrait,
	content
FROM
	tb_comment
INNER JOIN tb_users ON tb_comment.user_id = tb_users.id
WHERE
	article_id = -1
ORDER BY
	ctime DESC";
    $result = $link->query($query);
    $result = $result->fetch_all(MYSQLI_ASSOC);
    if (!empty($result)) {
        echo json_encode($result);
    } else {
        echo 0;
    }
}
$link->close();