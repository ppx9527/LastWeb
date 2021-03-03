<?php
include "connect.php";
if(!empty($_GET)){
    if($_GET['flag'] === 'data'){
        $query = "SELECT
	ctime,
	content,
	title
FROM
	tb_update_note
ORDER BY
    ctime DESC";
    $result = $link->query($query);
    $result = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
    }
}