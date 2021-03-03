<template>
     <div>
        <div>
            <b-row class="mb-5">
                <b-col cols="2">
                    <b-img src="../../assets/head-portrait.jpg" width="160px"></b-img>
                </b-col>
                <b-col>
                    <h2>{{ tutor.user_name }}</h2>
                    <h6 class="text-muted">电话：{{ tutor.user_tel }}</h6>
                    <h6 class="text-muted">{{ tutor.rate }} 分 | 0 人评分</h6>
                    <p>
                        <span class="tutor-tag" v-for="(tag, index) in tutor.tags" :key="index">
                            {{ tag.orientation_name }}
                        </span>
                    </p>
                </b-col>
            </b-row>
            
            <b-row class="flex-column mb-3">
                <div class="mb-4">
                    <h5 class="markdown-style mb-3">个人简介</h5>
                    <p>
                        {{ tutor.introduce}}
                    </p>
                </div>
                <div class="mb-4">
                    <h5 class="markdown-style mb-3">导师公告</h5>
                    <p>
                        {{ tutor.notice}}
                    </p>
                </div>
            </b-row>
        </div>

        <b-row>
            <form class="col-12 p-0">
                <fieldset disabled>
                    <div class="form-group row m-0">
                        <b-textarea class="col-10 mr-3" rows="2" placeholder="评论功能还未开放哦！" v-model="content"></b-textarea>
                        <b-button variant="primary" @click="submit()">立即评论</b-button>
                    </div>
                </fieldset>
            </form>
        </b-row>

        <b-row class="flex-column">
            <div class="text-center comment">
                <span>———————</span>——— 评论列表 ———<span>———————</span>
            </div>
            <!-- <div v-if="Object.keys(comments).length" id="lists">
                <div id="list" v-for="(comment, index) in comments" :key="index" class="position-relative">
                    <h6 class="text-muted d-inline-block" style="line-height: 60px">
                        #{{ index + 1 }}&nbsp;&nbsp;&nbsp;</h6>
                    <img :src="comment.head_portrait" class="user-img">
                    <div class="d-inline-block">
                        <div>
                            {{ comment.user_name }}&nbsp;&nbsp;
                            <span class="text-muted">{{ comment.ctime | time }}</span>
                        </div>
                        <div>{{ comment.content }}</div>
                    </div>
                </div>
            </div> -->
            <div>
                <h5>评论功能还未开放哦！</h5>
            </div>
        </b-row>
    </div>
</template>
<script>
export default {
    data() {
        return{
            tutor: Object,
            content:''
        }
    },
    methods: {
        submit(){
            if(this.content === ''){
                alert('评论内容不能为空');
                return;
            }
            this.$http.get('https://honi.top/zeshi/public/api/user/commentTutor',{
                params:{

                }
            }).then(response => {
                
            });
        }
    },
    beforeRouteEnter(to, from, next){
        next(vm => {
            vm.$http.get('https://honi.top/zeshi/public/api/tutor/getTutorDetail',{
                params:{
                    tutorId:to.query.tutorId
                }
            }).then(Response => {
                let state = Response.body;
                if (state.code === 200) {
                    vm.tutor = state.data
                }else{
                    alert('获取信息失败')
                }
            });
        })
    }
}
</script>
<style>
.comment {
	color: #8c8681;
	margin-top: 40px;
	margin-bottom: 35px;
}

@media screen and (max-width: 450px) {
	.comment span {
		display: none;
	}
}
</style>