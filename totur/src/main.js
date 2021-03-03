import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import VueResource from 'vue-resource'
import BootstrapVue from "bootstrap-vue"
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import 'font-awesome/css/font-awesome.min.css'
import animated from 'animate.css'
import {Cookie} from './modules'

Vue.use(BootstrapVue);
Vue.use(VueResource);
Vue.use(animated);
Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
    created() {
        this.$store.commit({
            type: 'changeOpenId',
            openId: new Cookie('openId')
        });
        this.$store.commit({
            type: 'changeUserType',
            userType: new Cookie('userType')
        });
        if (this.$store.getters.getOpenId === -1) {
            this.$router.push('/login/userLogin')
        } else {
            this.$router.push('/home/index')
        }
    },
}).$mount("#app");