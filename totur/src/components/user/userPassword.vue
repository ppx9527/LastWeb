<template>
    <b-col md="8" class="m-auto">
        <b-form @submit="submit">
            <b-form-group label="原密码" label-cols-md="2">
                <b-form-input
                    :state="$v.oldPassword.$error ? false : null"
                    v-model="$v.oldPassword.$model"
                    aria-describedby="input-1-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-1-live-feedback">
                    密码不能为空
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="新密码" label-cols-md="2">
                <b-form-input
                    v-model="$v.newPassword.$model"
                    :state="$v.newPassword.$error ? false : null"
                    aria-describedby="input-2-live-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="input-2-live-feedback">
                    密码不能为空并且密码长度必须大于6位
                </b-form-invalid-feedback>
            </b-form-group>
            <b-form-group label="确认密码" label-cols-md="2">
                <b-form-input
                    v-model="$v.repeatPassword.$model"
                    :state="$v.repeatPassword.$error ? false : null"
                    aria-describedby="input-3-live-feedback"
                ></b-form-input>
                 <b-form-invalid-feedback id="input-3-live-feedback">
                    确认密码不能为空并且确认密码必须与新密码一致
                </b-form-invalid-feedback>
            </b-form-group>
            <b-button type="submit" variant="outline-primary" block class="mt-4">提交</b-button>
        </b-form>
    </b-col>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength, sameAs } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data() {
        return {
            oldPassword: '',
            newPassword: '',
            repeatPassword: ''
        }
    },
    validations: {
        oldPassword: {
            required
        },
        newPassword: {
            required,
            minLength: minLength(6)
        },
        repeatPassword: {
            required,
            sameAsPassword: sameAs('newPassword')
        }
    },
    methods: {
        submit(){
            this.$v.$touch();
            if (this.$v.$anyError) {
                return
            }
            this.$http.get('https://honi.top/zeshi/public/api/user/changePassword',{
                params:{
                    userType: this.$store.getters.getUserType,
                    openId: this.$store.getters.getOpenId,
                    oldPwd:this.oldPassword,
                    newPwd:this.newPassword
                }
            }).then(response => {
                let state = response.body;
                let title = state.code === 200 ? '成功' : '失败';
                this.$bvModal.msgBoxOk(state.msg, {
                    title: `修改密码${title}`,
                    hideFooter:true,
                    centered: true,
                    okTitle: '我知道了',
                    okVariant:'outline-primary',
                    scrollable: true
                })
            });
        }
    }
}
</script>