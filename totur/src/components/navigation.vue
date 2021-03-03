<template>
    <div>
        <!-- 手机导航栏 -->
        <b-navbar type="light" variant="light" class="fixed-top" v-if="display">
             <a href="#" @click.prevent="menuUi = true">
                <svg version="1.1" width="32" height="32" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"
                    enable-background="new 0 0 1000 1000">
                    <g>
                        <path
                            d="M59,157h882c13.5,0,25.1,4.8,34.6,14.4S990,192.5,990,206c0,13.5-4.8,25.1-14.4,34.6c-9.6,9.6-21.1,14.4-34.6,14.4H59c-13.5,0-25.1-4.8-34.6-14.4C14.8,231.1,10,219.5,10,206c0-13.5,4.8-25.1,14.4-34.6S45.5,157,59,157z M59,745h882c13.5,0,25.1,4.8,34.6,14.4c9.6,9.6,14.4,21.1,14.4,34.6s-4.8,25.1-14.4,34.6c-9.6,9.6-21.1,14.4-34.6,14.4H59c-13.5,0-25.1-4.8-34.6-14.4C14.8,819.1,10,807.5,10,794s4.8-25.1,14.4-34.6C33.9,749.8,45.5,745,59,745z M59,451h882c13.5,0,25.1,4.8,34.6,14.4S990,486.5,990,500s-4.8,25.1-14.4,34.6c-9.6,9.6-21.1,14.4-34.6,14.4H59c-13.5,0-25.1-4.8-34.6-14.4C14.8,525.1,10,513.5,10,500s4.8-25.1,14.4-34.6S45.5,451,59,451z">
                        </path>
                    </g>
                </svg>
            </a>
           <b-navbar-brand class="m-auto">
                <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="基于vue">
                择师
            </b-navbar-brand>
        </b-navbar>
        <!-- 电脑导航栏 -->
        <b-navbar type="light" variant="light" class="fixed-top" v-else>
            <b-navbar-brand to="/home/index">
                <img src="../assets/logo.png" width="30" height="30" class="d-inline-block align-top" alt="基于vue">
                择师
            </b-navbar-brand>
            <b-navbar-nav>
                <b-nav-item to="/home/index" exact-active-class="active">首页</b-nav-item>
                <b-nav-item :to="tutorRouter" exact-active-class="active">导师</b-nav-item>
                <b-nav-item to="/home/homeWork" exact-active-class="active">提交作业</b-nav-item>
            </b-navbar-nav>
            <!-- 用户登录界面 -->
            <transition 
                name="login"
                mode="out-in"
                type="animation"
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutUp"
            >
                <div class="position-absolute" style="right: 20%;">
                    <router-link to="/home/user/userData" class="position-absolute" style="z-index: 11;top: -30px;">
                        <div
                            style="height: 60px;"
                            @mouseenter="big"
                            @mouseleave="small"
                        >
                            <img
                                src="../assets/head-portrait.jpg"
                                class="d-inline-block align-top i-face"
                                :style="{top: top}"
                                :width="width"
                                :height="height"
                                alt="头像"
                            >
                        </div>
                    </router-link>
                    <transition name="face">
                        <b-card
                            id="user-face"
                            v-show="flag"
                            @mouseleave="small"
                            @mouseenter="big"
                            :title="userInfo.user_name"
                            class="text-center"
                        >
                            <b-card-text v-if="userType == 0">
                                <h6>学号：{{ userInfo.student_id }}</h6>
                                <h6>年级：{{ userInfo.grade }}</h6>
                            </b-card-text>
                            <b-card-text v-else>
                                <h6>职工号：{{ userInfo.tutor_id}}</h6>
                                <h6>联系电话：{{ userInfo.user_tel}}</h6>
                            </b-card-text>
                            <b-button variant="primary" @click="unLogin">
                                注销 <i class="fa fa-paper-plane-o"></i>
                            </b-button>
                        </b-card>
                    </transition>
                </div>
            </transition>
        </b-navbar>
        <!-- 手机导航界面 -->
        <transition 
            type="animation" 
            enter-active-class="animated fadeIn" 
            leave-active-class="animated fadeOut"
            v-if="display"
        >
            <div
                @click="menuUi = false" 
                v-show="menuUi" 
                class="position-fixed w-100 h-100"
                style="background-color: rgba(0, 0, 0, 0.5);z-index: 1030;top: 53px;"
            >
                <transition 
                    type="animation" 
                    enter-active-class="animated fadeInLeft" 
                    leave-active-class="animated fadeOutLeft"
                >
                    <div class="h-100 pt-3" style="background-color: #fff;width: 65%;" v-show="menuUi">
                        <div class="nav flex-column">
                            <router-link class="m-auto" style="margin-bottom: 0.5rem !important;" to="/home/user/userData">
                                <img src="../assets/head-portrait.jpg" class="d-inline-block align-top" style="border-radius: 50%;" width="45" height="45" alt="头像">
                            </router-link>
                            <a class="nav-link text-center" href="#" @click.prevent="unLogin">注销 <i class="fa fa-paper-plane-o"></i></a>
                        </div>
                        <b-list-group vertical>
                            <b-nav-item to="/home/index" exact-active-class="active">首页</b-nav-item>
                            <b-list-group-item :to="tutorRouter" exact-active-class="active">导师</b-list-group-item>
                            <b-list-group-item to="/home/homeWork" exact-active-class="active">提交作业</b-list-group-item>
                        </b-list-group>
                    </div>
                </transition>
            </div>
        </transition>
    </div>
</template>
<script>
export default {
    data () {
        return {
            width:40,
            height:40,
            flag:false,
            top:'10px',
            display:false,
            menuUi:false,
        }
    },
    methods:{
        big() {
            this.width = 60;
            this.height = 60;
            this.top = '30px';
            this.flag = true;
        },
        small() {
            if (this.flag === true) {
                this.width = 40;
                this.height = 40;
                this.top = '10px';
                this.flag = false;
            }
        },
        unLogin () {
            this.$store.state.openId.del_cookie();
            this.$store.state.userType.del_cookie();
            this.$http.get('https://honi.top/zeshi/public/api/user/clearBind');
            this.$router.push('/login/userLogin');
        }
    },
    created() {
        if (window.innerWidth <= 450) {
            this.display = true;
        }
        addEventListener('resize',() => {
            this.display = window.innerWidth <= 450;
        });
    },
    computed: {
        userInfo(){
            return this.$store.state.userInfo
        },
        userType(){
            return this.$store.getters.getUserType
        },
        tutorRouter(){
            return this.userType == 0 ? '/home/tutor/tutorList' : '/home/tutor/studentInfo'
        }
    }
}
</script>
<style>
.image-enter-active {
	transform: translateX(0);
	transition: all 1s ease;
}

.image-leave-active {
	transform: translateX(-100%);
	transition: all 1s ease;
}

.image-enter {
	transform: translateX(100%)
}

.image-leave {
	transform: translateX(0)
}

.face-enter-active,
.face-leave-active {
	transition: all .3s;
}

.face-enter,
.face-leave-to {
	opacity: 0;
}

.i-face {
	border-radius: 50%;
	transition: all 0.5s;
	position: relative;
}

#user-face {
	position: absolute;
	width: 250px;
	left: -100px;
	top: 28px;
    padding-top: 20px;
    z-index: 10;
}
</style>