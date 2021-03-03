<template>
    <div>
        <b-card sub-title="学生余量" class="text-center" v-if="studentRemain.hasOwnProperty('0')">
            <b-card-text>
                <b-row>
                    <b-col cols="4" style="color: rgb(33, 185, 178)">
                        {{ studentRemain[0].grade + ' 级：' + studentRemain[0].remain }}
                    </b-col>
                    <b-col cols="4" style="color: rgb(182, 221, 129)">
                        {{ studentRemain[1].grade + ' 级：' + studentRemain[1].remain }}
                    </b-col>
                    <b-col cols="4" style="color: rgb(105, 62, 181)">
                        {{ studentRemain[2].grade + ' 级：' + studentRemain[2].remain }}
                    </b-col>
                </b-row>
            </b-card-text>
        </b-card>
        <div class="mt-5">
            <b-card
                v-for="(student, index) in applyList"
                :key="index"
                class="mt-4 student"
            >
                <b-card-text>
                    <b-row>
                        <b-col cols="8">
                            <h5>
                                {{ student.student_name }}
                                <span style="color: rgb(152, 152, 152)">申请成为您的学生</span>
                            </h5>
                        </b-col>
                        <b-col>
                            <h5 v-if="student.status === 1" style="color: rgb(250, 188, 9)">待审批</h5>
                            <h5 v-else-if="student.status === 3" style="color: rgb(40, 167, 69)">已批准</h5>
                            <h5 v-else style="color: rgb(202, 37, 53)">已拒绝</h5>
                        </b-col>
                    </b-row>
                    <b-row no-gutters>
                        <b-col cols="2">
                            <b-card-img
                                src="../../assets/head-portrait.jpg"
                                alt="头像"
                                height="auto"
                                width="180px"
                                style="padding: 20px;"
                            ></b-card-img>
                        </b-col>
                        <b-col class="pt-4 ml-4 mb-4">
                            <div class="d-flex flex-column bd-highlight h-100">
                                <div class="flex-grow-1 bd-highlight">
                                    {{ student.introduce }}
                                </div>
                                <div>
                                    <b-button-group>
                                        <b-button variant="info" @click="showStudent(student.student_id)">信息</b-button>

                                        <b-button variant="success" @click="agree(student.id)">同意</b-button>
                                        <b-button variant="danger" @click="refuse(student.id)">拒绝</b-button>
                                    </b-button-group>
                                </div>
                            </div>
                        </b-col>
                    </b-row>
                    <b-row>
                        <b-col>
                            申请时间： {{student.apply_time}}
                        </b-col>
                    </b-row>
                </b-card-text>
            </b-card>
        </div>
        <b-modal
            id="refuse"
            title="请输入拒绝理由"
            ok-title="确认"
            cancel-title="拒绝"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
        >
            <b-form-input v-model="reason"></b-form-input>
        </b-modal>
    </div>
</template>

<script>
export default {
    data (){
        return {
            applyList: Object,
            studentRemain: Object,
            reason:'',
            id: ''
        }
    },
    methods: {
        getApplyList(){
            this.$http.get('https://honi.top/zeshi/public/api/user/getApplyList',{
                params: {
                    openId: this.$store.getters.getOpenId,
                    userType:this.$store.getters.getUserType
                }
            }).then(response => {
                let state = response.body;
                if (state.code === 200){
                    this.applyList = state.data['applyList'];
                    this.studentRemain = state.data['studentRemain']
                }
            })
        },
        examine(id, status, refuseReason){
            const params = {
                id,
                status
            };
            if (refuseReason !== undefined)
                params.refuseReason = refuseReason;
            this.$http.get('https://honi.top/zeshi/public/api/tutor/examine',{
                params
            }).then(response => {
                let state = response.body;
                let title = state.code === 200 ? '成功' : '失败';
                this.$bvModal.msgBoxOk(state.msg, {
                    title: `审批操作${title}`,
                    hideFooter:true,
                    centered: true,
                    okTitle: '我知道了',
                    okVariant:'outline-primary'
                })
            })
        },
        resetModal() {
            this.reason = '';
            this.id = ''
        },
        agree(id){
            this.examine(id, 3)
        },
        refuse(id){
            this.$bvModal.show('refuse');
            this.id = id;
        },
        showStudent(studentId){
            this.$router.push({
                path:'/home/tutor/showStudent',
                query:{studentId}
            })
        },
        handleOk(bvModalEvt){
            bvModalEvt.preventDefault();
            if (!this.reason){
                return
            }
            this.examine(this.id, 2, this.reason);
            this.$nextTick(() => {
                this.$bvModal.hide('refuse')
            })
        }
    },
    created() {
        this.getApplyList();
    }
}
</script>
<style>
.student{
    transition: all 0.4s;
}

.student:hover {
    box-shadow: 1px 3px 9px rgb(204, 204, 204);
}
</style>