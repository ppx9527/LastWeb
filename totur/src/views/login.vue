<template>
    <div id="login">
        <div class="login p-5">
            <b-nav tabs fill>
                <b-nav-item to="/login/userLogin" exact-active-class="active">登录</b-nav-item>
                <b-nav-item to="/login/register" exact-active-class="active">注册</b-nav-item>
            </b-nav>
            <transition 
                type="animation" 
                enter-active-class="animated flipInX" 
                leave-active-class="animated flipOutX" 
                mode="out-in"
            >
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
            <div class="right">
                <img src="../assets/right.png" alt="右">
            </div>
            <div class="left">
                <img src="../assets/left.png" alt="左">
            </div>
        </div>
    </div>
</template>
<style>
#login {
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: #f5f7ff;
}

@media screen and (min-width:521px) {
    .login {
        width: 420px;
        box-shadow: 0 2px 8px rgba(12, 12, 13, 0.1);
        margin-top: 130px;
        margin-left: auto;
        margin-right: auto;
        background-color: rgb(255, 255, 255);
    }
}

@media screen and (max-width:520px) {

    .right,
    .left {
        display: none !important;
    }

    .login {
        max-width: 420px;
        min-width: 300px;
        margin-top: 60px;
    }

    #login {
        background-color: rgb(255, 255, 255);
    }
}

.right {
    position: absolute;
    left: 0;
    top: 13px;
    z-index: 3;
}

.left {
    position: absolute;
    right: 0;
    top: 13px;
    z-index: 3;
}
</style>