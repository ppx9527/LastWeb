<template>
    <b-col md="8" class="m-auto">
        <b-form @submit="submit">
            <b-form-group label="反馈" label-cols-md="2" class="mb-4">
                <b-textarea
                    v-model="feedback"
                    rows="2"
                    placeholder="请输入你具体碰到的问题或者需要改进的地方，我们一定会认真审核每一条反馈，争取做得更好！" 
                ></b-textarea>
            </b-form-group>
            <b-button variant="outline-primary" block type="submit">确认反馈</b-button>
        </b-form>
    </b-col>
</template>
<script>
export default {
    data() {
        return {
            feedback:''
        }
    },
    methods: {
        submit(){
            this.$http.get('https://honi.top/zeshi/public/api/common/feedback',{
                params:{
                    openId: this.$store.getters.getOpenId,
                    feedback:this.feedback
                }
            }).then(response => {
                let state = response.body;
                let title = state.code === 200 ? '成功' : '失败';
                this.$bvModal.msgBoxOk(state.msg, {
                    title: `反馈操作${title}`,
                    hideFooter:true,
                    centered: true,
                    okTitle: '我知道了',
                    okVariant:'outline-primary',
                    scrollable: true
                })
            });
        }
    },
}
</script>