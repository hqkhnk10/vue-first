import axios from "axios";

const state = {
    user: null,
    role: null,
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    StateRole: (state) => state.role,
    StateUser: (state) => state.user,
};

const actions = {
    async Register({ dispatch }, form) {
        await axios.post('register', form)
        let UserForm = new FormData()
        UserForm.append('username', form.username)
        UserForm.append('password', form.password)
        await dispatch('LogIn', UserForm)
    },

    async LogIn(user) {
        console.log(user)
        await axios.post("http://localhost:3000/auth", user);
    },

    async CreateRole({ dispatch }, role) {
        await axios.post("post", role);
        return await dispatch("GetRole");
    },

    async GetRole({ commit }) {
        let response = await axios.get("posts");
        commit("setRole", response.data);
    },

    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
    },
};

const mutations = {
    setUser(state, username) {
        state.user = username;
    },

    setRole(state, role) {
        state.role = role;
    },
    logout(state, user) {
        state.user = user;
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};