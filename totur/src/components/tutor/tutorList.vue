<template>
    <div class="scroll" @emit-scroll="nextTutorList">
        <b-input-group class="mb-5">
            <b-input-group-prepend>
                <b-input-group-text>
                    <i class="fa fa-search"></i>
                </b-input-group-text>
            </b-input-group-prepend>
            <b-form-input 
                type="text"
                placeholder="搜索导师"
                v-model="key"
                @input="search()"
            ></b-form-input>
        </b-input-group>
        <div class="cards">
            <b-card
                v-for="(tutor, key) in tutors"
                :key="key"
                v-show="tutor.isShow"
                @click="showTutor(tutor.tutor_id)"
                style="cursor: pointer;"
                class="mb-4 tutor"
                no-body
            >
                <b-row no-gutters>
                    <b-col cols="2">
                        <b-card-img
                            src="../../assets/head-portrait.jpg"
                            alt="头像"
                            height="90%"
                            style="padding: 20px;"
                        ></b-card-img>
                    </b-col>
                    <b-col>
                        <b-card-body
                            :title="tutor.user_name"
                            :sub-title="'剩余：' + tutor.remain"
                            class="ml-3"
                        >
                            <b-card-text class="mt-4">
                                <span 
                                    class="tutor-tag"
                                    v-for="(tag, index) in tutor.tags"
                                    :key="index"
                                >
                                    {{ tag }}
                                </span>
                            </b-card-text>
                            <b-button variant="primary" @click.stop="choose(tutor.tutor_id)">选择</b-button>
                        </b-card-body>
                    </b-col>
                </b-row>
            </b-card>
        </div>
    </div>
</template>
<script>
import {Scroll} from "../../modules"

export default {
    data() {
        return {
            tutors: {},
            key: '',
            page:1,
            noData:false
        }
    },
    methods:{
        search(){
            for (const key in this.tutors) {
                if (this.tutors.hasOwnProperty(key)) {
                    const element = this.tutors[key];
                    element.isShow = element.user_name.includes(this.key);
                }
            }
        },
        getTutor(page){
            this.$http.get('https://honi.top/zeshi/public/api/tutor/getTutorList',{
                params:{
                    openId:this.$store.getters.getOpenId,
                    page
                }
            }).then(response => {
                let code = response.body.code;
                if (code === 200) {
                    let tempTutor = response.body.data;
                    if (Object.keys(tempTutor).length > 0) {
                        for (const key in tempTutor) {
                            if (tempTutor.hasOwnProperty(key)){
                                this.$set(this.tutors, key, tempTutor[key])
                            }
                        }
                        this.page++;
                    }else{
                        this.noData = true;
                        this.alertNoData('没有更多数据了')
                    }
                } else {
                    this.alertNoData('失败原因可能是服务器炸了，请联系管理员')
                }
            });
        },
        showTutor(tutorId){
            this.$router.push({
                path:'/home/tutor/showTutor',
                query:{tutorId}
            })
        },
        choose(tutorId){
            this.$http.get('https://honi.top/zeshi/public/api/tutor/selectTutor',{
                params:{
                    tutorId,
                    openId: this.$store.getters.getOpenId
                }
            }).then(response => {
                let state = response.body;
                let title = state.code === 200 ? '成功' : '失败';
                this.$bvModal.msgBoxOk(state.msg, {
                    title: `选择导师${title}`,
                    hideFooter:true,
                    centered: true,
                    okTitle: '我知道了',
                    okVariant:'outline-primary',
                    scrollable: true
                })
            })
        },
        nextTutorList(){
            if (this.noData) {
                this.alertNoData('没有更多数据了');
                return
            }
            this.getTutor(this.page);
        },
        alertNoData(msg){
            return this.$bvModal.msgBoxOk(msg, {
                title: '获取导师数据失败',
                hideFooter:true,
                centered: true,
                okTitle: '我知道了',
                okVariant:'outline-primary',
                noStacking: true,
                scrollable: true
            })
        }
    },
    created: function () {
        this.getTutor(this.page);
        let a = true;

        window.addEventListener('scroll', () => {
            let event = new Event('emit-scroll');

            if (Scroll.getScrollTop() + Scroll.getWindowHeight() >= Scroll.getScrollHeight() - 1) {
                let scrollElement = document.getElementsByClassName('scroll');

                for (const key in scrollElement) {
                    if (scrollElement.hasOwnProperty(key) && a) {
                        const element = scrollElement[key];
                        new Promise((resolve, reject)=>{
                            a = false;
                            element.dispatchEvent(event);
                            setTimeout(resolve, 1500)
                        }).then(() => {
                            a = true
                        })
                    }
                }
            }
        });
    }
}
</script>
<style>
.tutor{
    transition: all 0.4s;
}

.tutor:hover {
	box-shadow: 1px 3px 9px rgb(204, 204, 204);
}
</style>