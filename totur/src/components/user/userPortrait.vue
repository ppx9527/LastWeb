<template>
    <b-col md="8" class="m-auto">
        <b-row class="mb-5">
            <b-img :src="src" class="m-auto" width="250" height="250" style="border-radius: 50%"></b-img>
        </b-row>
        <div>
            <b-file
                v-model="img"
                :state="Boolean(img)"
                placeholder="请选择图片..."
                drop-placeholder="请放图片在此"
                accept=".jpg, .png, .gif"
                class="mb-4"
                @change="choose_img"
            ></b-file>
            <b-button variant="outline-primary" block @click.prevent="submit">提交</b-button>
        </div>
    </b-col>
</template>
<script>
export default {
    data() {
        return {
            img: null,
            src:'../../assets/head-portrait.jpg'
        };
    },
    methods:{
        choose_img (){
            if(this.img != null){
                this.src = URL.createObjectURL(this.img)
            }
        },
        submit () {
            // let form = new FormData();
            // if (this.flag === false && this.img !== '') {
            //     form.append('file',this.img,this.fileName);
            //     this.$http.get('https://honi.top/zeshi/public/api/',form,{
            //     	headers:{'Content-Type':'multipart/form-data'},
            //     }).then(response => {
            //     	if (response.body === '1') {
            //     		alert('修改成功');
            //     	} else {
            //     		alert('修改失败');
            //     	}
            //     });
            //     alert('此功能还没开');
            // } else {
            //     alert('上传失败，请检查文件！');
            // }
            alert('此功能还没开');
        }
    }
}
</script>