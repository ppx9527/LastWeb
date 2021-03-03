<?php
include 'connect.php';
if (isset($_POST['href'])){
    $href = $_POST['href'];
    $src = $_POST['src'];
    $alt = $_POST['alt'];
    $time = date('Y-m-d h:i:s');
    $query = "insert into tb_carousel (src, href, alt,ctime) value ('$src','$href','$alt','$time')";
    if ($link->query($query)) {
        echo 1;
    }
} else {
    $query = "select src,href,alt from tb_carousel order by id desc limit 5";
    $result = $link->query($query);
    $result = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($result);
}
$link->close();