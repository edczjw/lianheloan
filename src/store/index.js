import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    //state为状态数据，触发action，mutations会去改变state的值，getters对外提拱state的值。
    state: { 
        domain: 'http://dev.bxadmin.msxiaodai.com',
        isLeftHiden: false,//隐藏侧边栏
        buttonshow: true,//开户提交按钮
        token: '16516541'
    }
})  