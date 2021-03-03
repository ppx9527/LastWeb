<template>
    <div>
        <b-nav fill tabs class="mb-5">
            <b-nav-item to="/home/user/userData" exact exact-active-class="active">修改信息</b-nav-item>
            <b-nav-item to="/home/user/userPortrait" exact exact-active-class="active">更换头像</b-nav-item>
            <b-nav-item to="/home/user/userPassword" exact exact-active-class="active">修改密码</b-nav-item>
            <b-nav-item to="/home/user/userFeedback" exact exact-active-class="active">意见反馈</b-nav-item>
        </b-nav>
        <transition mode="out-in" name="fade">
            <router-view></router-view>
        </transition>
    </div>
</template>