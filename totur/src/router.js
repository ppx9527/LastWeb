import Vue from "vue"
import Router from "vue-router"
import Home from "./views/Home.vue"
import login from "./views/login.vue"
import user from "./views/home/user.vue"
import index from "./views/home/index.vue"
import homeWork from "./views/home/homeWork.vue"
import tutor from "./views/home/tutor"

Vue.use(Router);
const routes = [{
    path: '/login',
    component: login,
    children: [{
        path: 'userLogin',
        component: () => import("./components/login/userLogin.vue")
    },{
        path: 'register',
        component: () => import("./components/login/register.vue")
    }]
}, {
    path: '/home',
    component: Home,
    children: [{
        path: 'index',
        component: index
    },{
        path: 'tutor',
        component: tutor,
        children: [{
            path: 'tutorList',
            component: () => import("./components/tutor/tutorList.vue")
        },{
            path: 'showTutor',
            component: () => import("./components/tutor/showTutor.vue")
        },{
            path: 'studentInfo',
            component: () => import("./components/tutor/studentInfo.vue")
        },{
            path: 'showStudent',
            component: () => import("./components/tutor/showStudent.vue")
        }]
    },{
        path: 'homeWork',
        component: homeWork
    },{
        path: 'user',
        component: user,
        children: [{
            path: 'userData',
            component: () => import("./components/user/userData.vue")
        },{
            path: 'userPortrait',
            component: () => import("./components/user/userPortrait.vue")
        },{
            path: 'userPassword',
            component: () => import("./components/user/userPassword.vue")
        },{
            path: 'userFeedback',
            component: () => import("./components/user/userFeedback.vue")
        }]
    }]
}
];
export default new Router({
    routes
});