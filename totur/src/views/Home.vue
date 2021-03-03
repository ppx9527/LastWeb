<template>
    <div class="home">
        <navigation></navigation>
        <b-container>
            <transition mode="out-in" name="fade">
                <keep-alive>
                    <router-view />
                </keep-alive>
            </transition>
        </b-container>
    </div>
</template>

<script>
import navigation from "../components/navigation"

export default {
    components: {
        navigation
    },
    created() {
        this.$http.get('https://honi.top/zeshi/public/api/user/getUserInfo', {
            params: {
                userType:this.$store.getters.getUserType,
                openId:this.$store.getters.getOpenId
            }
        }).then(response => {
            let state = response.body;
            if (state.code === 200) {
                this.$store.commit({
                    type: 'changeUserInfo',
                    userInfo: state.data
                })
            }
        })
    },
};
</script>
<style>
.container{
    margin-top: 150px;
    margin-bottom: 150px;
}

@media screen and (max-width: 450px) {
    .container{
        margin-top: 55px;
        margin-bottom: 20px;
    }
}

.fade-enter-active{
    transition: all .3s ease;
}

.fade-leave-active {
    transition: all .3s ease;
}
.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>