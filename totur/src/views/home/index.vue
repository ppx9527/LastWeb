<template>
    <b-container>
        <!-- 学生界面 -->
        <div v-if="userType == 0">
            <b-card :title="notice.user_name" v-if="notice.hasOwnProperty('user_name')">
                <b-card-text>
                    <span
                        class="tutor-tag"
                        v-for="(tag, index) in notice.tags"
                        :key="index"
                    >
                        {{ tag.orientation_name }}
                    </span>
                    <p class="mt-3">
                        {{ notice.notice }}
                    </p>
                </b-card-text>
            </b-card>
            <b-card v-else>
                <b-card-text>
                    {{ notice.notice }}
                </b-card-text>
                <b-button variant="outline-danger" @click="cancelApply">取消申请</b-button>
            </b-card>
        </div>
        <!-- 导师界面 -->
        <b-card v-else-if="studentInfo" class="text-center">
            <b-card-text>
                <b-row>
                    <b-col cols="3" style="color: rgb(226, 73, 159)">
                        <i class="fa fa-file-o mr-2"></i>
                        <span>作业：{{ studentInfo.homework }}</span>
                    </b-col>
                    <b-col cols="3" style="color: rgb(237, 149, 74)">
                        <i class="fa fa-exclamation-triangle mr-2"></i>
                        <span>申请：{{ studentInfo.apply }}</span>
                    </b-col>
                    <b-col cols="3" style="color: rgb(29, 140, 243)">
                        <i class="fa fa-user-o mr-2"></i>
                        <span>学生：{{ studentInfo.student }}</span>
                    </b-col>
                    <b-col cols="3" style="color: rgb(229, 151, 146)">
                        <i class="fa fa-user-o mr-2"></i>
                        <span>余量：{{ studentInfo.remain }}</span>
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
        <announcement :user-type="userType"></announcement>
    </b-container>
</template>
<script>
import announcement from "../../components/index/announcement"

export default {
    data() {
        return {
            notice:Object,
            studentInfo: null
        }
    },
    methods: {
        cancelApply(){
            this.$http.get('https://honi.top/zeshi/public/api/user/cancelApply',{
                params:{
                    openId: this.$store.getters.getOpenId
                }
            }).then(response => {
                let state = response.body;
                let title = state.code === 200 ? '成功' : '失败';
                this.$bvModal.msgBoxOk(state.msg, {
                    title: `操作${title}`,
                    hideFooter:true,
                    centered: true,
                    okTitle: '我知道了',
                    okVariant:'outline-primary',
                    noStacking: true,
                    scrollable: true
                })
            })
        },
        getTutorInfo(){
            this.$http.get('https://honi.top/zeshi/public/api/tutor/getTutorInfo',{
                params:{
                    openId: this.$store.getters.getOpenId
                }
            }).then(response => {
                let state = response.body;
                this.notice = state.code === 200 ? state.data : Object;
            })
        },
        getStudentInfo(){
            this.$http.get('https://honi.top/zeshi/public/api/tutor/getHomeWorkStudentInfo',{
                params:{
                    openId: this.$store.getters.getOpenId
                }
            }).then(response => {
                let state = response.body;
                this.studentInfo = state.code === 200 ? state.data : Object;
            })
        }
    },
    created() {
        if (this.userType == 0){
            this.getTutorInfo()
        } else {
            this.getStudentInfo()
        }
    },
    computed: {
        userType() {
            return this.$store.getters.getUserType;
        }
    },
    components: {
        announcement
    }
}
</script>
<style>
    .tutor-tag{
        color: rgb(242, 251, 251);
        background-color: rgb(27, 187, 179);
        padding: 5px;
        margin-right: 15px;
    }
</style>