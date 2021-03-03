<template>
    <div>
        <div>
            <b-row class="mb-5">
                <b-col cols="2">
                    <b-img src="../../assets/head-portrait.jpg" width="160px"></b-img>
                </b-col>
                <b-col>
                    <h2>{{ student.user_name }}</h2>
                    <h6 class="text-muted">电话：{{ student.user_tel }}</h6>
                    <h6 class="text-muted">年级：{{ student.grade }}</h6>
                    <h6 class="text-muted">班级：{{ student.class }}</h6>
                </b-col>
            </b-row>

            <b-row class="flex-column mb-3">
                <div class="mb-4">
                    <h5 class="markdown-style mb-3">个人简介</h5>
                    <p>
                        {{ student.introduce}}
                    </p>
                </div>
                <div class="mb-4">
                    <h5 class="markdown-style mb-3">荣誉</h5>
                    <p>
                        {{ student.honours }}
                    </p>
                </div>
                <div class="mb-4">
                    <h5 class="markdown-style mb-3">详细信息</h5>
                    <p>
                        教师资格证：{{ student.teacher_qualification_certificate }}<br>
                        计算机资格证：{{ student.computer_qualification_certificate }}<br>
                        英语等级： {{ student.english_level }}
                    </p>
                </div>
            </b-row>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return{
            student: Object
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            vm.$http.get('https://honi.top/zeshi/public/api/user/getUserInfo',{
                params:{
                    openId:vm.$store.getters.getOpenId,
                    userType:vm.$store.getters.getUserType,
                    student_id:to.query.studentId
                }
            }).then(Response => {
                let state = Response.body;
                if (state.code === 200) {
                    vm.student = state.data
                }else{
                    alert('获取信息失败')
                }
            });
        })
    }
}
</script>