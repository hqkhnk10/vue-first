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
    async Register({ dispatch }, User) {
        console.log('register', User)
        await axios.post('http://localhost:3000/accounts',
            { username: User.username, password: User.password, role: 'member' })
        await dispatch('LogIn', User)
    },

    async LogIn({ commit }, User) {
        console.log(User)
        await axios.post('http://localhost:3000/auth',
            { username: User.username, password: User.password })
            .then(function (response) {
                commit('setUser', response.data.username)
                commit('setRole', response.data.role)
            })
    },

    async CreateRole({ dispatch }, role) {
        await axios.post("post", role);
        return await dispatch("GetRole");
    },

    async LogOut({ commit }) {
        let user = null;
        commit("logout", user);
    },
};

const mutations = {
    setUser(state, username) {
        console.log('set user', username)
        state.user = username;
    },

    setRole(state, role) {
        console.log('set role', role)
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