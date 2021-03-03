import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
const state = {
    openId: null,
    userType: null,
    userInfo: Object
};

const getters = {
    getOpenId: state => state.openId.cookieValue,
    getUserType: state => state.userType.cookieValue
};

const mutations = {
    changeOpenId(state, payload) {
        state.openId = payload.openId;
    },
    changeUserType(state, payload) {
        state.userType = payload.userType;
    },
    changeUserInfo(state, payload) {
        state.userInfo = payload.userInfo;
    }
};

export default new Vuex.Store({
    state,
    mutations,
    getters
});
