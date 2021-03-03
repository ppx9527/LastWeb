<template>
    <b-form class="mt-5" @submit.prevent="onSubmit">
        <div role="group" class="mb-4">
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>
                        <i class="fa fa-user-o fa-fw"></i>
                    </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                    v-model.trim ="$v.form.user.$model"
                    :state="$v.form.user.$error ? false : null"
                    placeholder="职工号/学号"
                ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback :state="$v.form.user.$error ? false : null">
                请输入职工号或学号
            </b-form-invalid-feedback>
            <!-- 账户密码接口 -->
            <!-- <b-form-invalid-feedback :state="$v.form.user.isRight ? false : null">
                密码或账户不正确
            </b-form-invalid-feedback> -->
        </div>

        <div role="group" class="mb-4">
            <b-input-group>
                <b-input-group-prepend>
                    <b-input-group-text>
                        <i class="fa fa-lock fa-fw"></i>
                    </b-input-group-text>
                </b-input-group-prepend>
                <b-form-input
                    v-model.trim ="$v.form.password.$model"
                    :state ="$v.form.password.$error ? false : null"
                    placeholder="密码"
                    type="password"
                ></b-form-input>
            </b-input-group>
            <b-form-invalid-feedback :state="$v.form.password.$error ? false : null">
                请输入密码
            </b-form-invalid-feedback>
            <!-- <b-form-invalid-feedback :state="$v.form.password.$error ? false : null">
                请输入密码
            </b-form-invalid-feedback> -->
        </div>
        
        <b-button type="submit" block variant="primary">登录</b-button>
    </b-form>
</template>
<script>
import { validationMixin } from 'vuelidate'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
    mixins: [validationMixin],
    data () {
        return{
            form:{
                user:null,
                password:null
            }
        }
    },
    validations: {
        form: {
            user: {
                required
            },
            password: {
                required
            }
        }
    },
    methods:{
        onSubmit() {
            // 把所有$dirty设置为true，进行验证
            this.$v.form.$touch()
            if (this.$v.form.$anyError) {
                return
            }
            
            this.$http.get('https://honi.top/zeshi/public/api/user/userLogin',{
                params:{
                    'userId':this.form.user,
                    'userPwd':this.form.password,
                    openId:'orNLS5ICe_CdPeH3JQ0bYx0atT8M'
                }
            }).then(response => {
                let state = response.body;
                switch (state.code) {
                case 500:
                    alert('用户或密码错误');
                    break;
                case 200:
                    this.$store.state.openId.set_cookie('orNLS5ICe_CdPeH3JQ0bYx0atT8M')
                    this.$store.state.userType.set_cookie(state.data.userType)
                    this.$router.push('/home/index')
                }
            },response => {
                alert(`登录失败，请求状态码：${response.status}`);
            });
        }
    }
}
</script>