import router from "@/router";
import Repository from "@repdir/RepositoryFactory";
const Auth = Repository.get("auth");

export default {
    namespaced: true,
    state: {
        isLogin: false,
        user: {},
        token:null,
        permissions: [],
    },
    getters: {},
    mutations: {
        resetState(state) {
            state.isLogin = false;
            state.user = null;
        },
        loginRequest(state, user) {
            state.isLogin = true;
            state.user = user;
        },
        loginSuccess(state, user) {
            state.isLogin = true;
            state.user = user;
        },
        loginFailure(state) {
            state.isLogin = false;
        },
    },
    actions: {
        async login({ commit }, payload) {
            let result = await Auth.login(payload);

            if (result.status == 200) {
                commit("loginSuccess", result.data.user);
                localStorage.setItem("token", result.data.access_token);
                router.push("/");
            } else {
                return result;
            }
        },
        logout({ commit }) {
            commit("resetState");
            localStorage.removeItem("token");
            router.push("/login");
        },
        clearState({ commit }) {
            commit("resetState");
        },
        async user({ commit }) {
            let result = await Auth.user();
            commit("loginSuccess", result.data);
        },
    },
};
