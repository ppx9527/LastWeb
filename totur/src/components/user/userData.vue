<template>
    <b-col md="8" class="m-auto">
        <b-form v-if="$store.getters.getUserType == 0" @submit="submit()">
            <b-form-group label="学号" label-cols-md="2">
                <b-form-input v-model="userInfo.student_id" placeholder="请输入您的学号"></b-form-input>
            </b-form-group>
            <b-form-group label="姓名" label-cols-md="2">
                <b-form-input v-model="userInfo.user_name" placeholder="请输入您的姓名"></b-form-input>
            </b-form-group>
            <b-form-group label="联系电话" label-cols-md="2">
                <b-form-input v-model="userInfo.user_tel" placeholder="请输入您的联系电话"></b-form-input>
            </b-form-group>
            <b-form-group label="年级" label-cols-md="2">
                <b-form-select v-model="userInfo.grade" :options="student.greads"></b-form-select>
            </b-form-group>
            <b-form-group label="班级" label-cols-md="2">
                <b-form-select v-model="userInfo.class" :options="student.classes"></b-form-select>
            </b-form-group>
            <b-form-group label="英文" label-cols-md="2">
                <b-form-select v-model="userInfo.english_level" :options="student.english_levels"></b-form-select>
            </b-form-group>
            <b-form-group label="教师资格证" label-cols-md="2">
                <b-form-select v-model="userInfo.teacher_qualification_certificate" :options="student.teacher_qualification_certificates"></b-form-select>
            </b-form-group>
            <b-form-group label="计算机资格证" label-cols-md="2">
                <b-form-select v-model="userInfo.computer_qualification_certificate" :options="student.computer_qualification_certificates"></b-form-select>
            </b-form-group>
            <b-form-group label="其他荣耀" label-cols-md="2">
                <b-textarea rows="2" placeholder="请输入其他获奖信息或证书" v-model="userInfo.honours"></b-textarea>
            </b-form-group>
            <b-form-group label="个性简介" label-cols-md="2">
                <b-textarea rows="2" placeholder="请输入个人简介" v-model="userInfo.introduce"></b-textarea>
            </b-form-group>
            <b-button type="submit" variant="outline-primary" block class="mt-4">提交</b-button>
        </b-form>

        <b-form v-else @submit="submit()">
            <b-form-group label="职工号" label-cols-md="2">
                <b-form-input v-model="userInfo.tutor_id" placeholder="请输入您的职工号"></b-form-input>
            </b-form-group>
            <b-form-group label="姓名" label-cols-md="2">
                <b-form-input v-model="userInfo.user_name" placeholder="请输入您的姓名"></b-form-input>
            </b-form-group>
            <b-form-group label="职称" label-cols-md="2">
                <b-form-input v-model="userInfo.title" placeholder="请输入您的职称"></b-form-input>
            </b-form-group>
            <b-form-group label="联系电话" label-cols-md="2">
                <b-form-input v-model="userInfo.user_tel" placeholder="请输入手机号"></b-form-input>
            </b-form-group>
            <b-form-group label="指导方向" label-cols-md="2">
                <b-textarea rows="2" placeholder="请输入指导方向，以空格分割例：就业 学术 研究" v-model="userInfo.tags"></b-textarea>
            </b-form-group>
            <b-form-group label="导师公告" label-cols-md="2">
                <b-textarea rows="2" placeholder="请输入您的个人公告"  v-model="userInfo.notice"></b-textarea>
            </b-form-group>
            <b-form-group label="个性简介" label-cols-md="2">
                <b-textarea rows="2" placeholder="请输入个人简介" v-model="userInfo.introduce"></b-textarea>
            </b-form-group>
            <b-button type="submit" variant="outline-primary" block class="mt-4">提交</b-button>
        </b-form>
    </b-col>
</template>
<script>
export default {
    data() {
        return {
            student:{
                greads: [2011,2012,2013,2014,2015,2016,2017,2018,2019],
                classes: ['1班', '2班', '3班'],
                english_levels: ['四级以下', '英语四级', '英语六级', '六级以上'],
                teacher_qualification_certificates: ['无', '拥有'],
                computer_qualification_certificates: ['无', '省级一级', '省级二级', '省级三级', '国家一级', '国家二级', '国家三级']
            }
        }
    },
    methods:{
        submit() {
            this.$http.get('https://honi.top/zeshi/public/api/user/changeUserInfo',{
                params:{
                    '': this.userInfo,
                    userType: this.$store.getters.getUserType
                }
            }).then(response => {
                let state = response.body;
                let title = state.code === 200 ? '成功' : '失败';
                this.$bvModal.msgBoxOk(state.msg, {
                    title: `修改信息${title}`,
                    hideFooter:true,
                    centered: true,
                    okTitle: '我知道了',
                    okVariant:'outline-primary',
                    scrollable: true
                })
            });
        }
    },
    computed: {
        userInfo() {
            return this.$store.state.userInfo
        }
    }
}
</script>