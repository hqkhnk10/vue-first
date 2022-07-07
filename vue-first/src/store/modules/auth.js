import axios from "axios";

const state = {
    user: null,
    role: null,
    token: null,
};

const getters = {
    isAuthenticated: (state) => !!state.user,
    StateRole: (state) => state.role,
    StateUser: (state) => state.user,
    StateToken: (state) => state.token,
};

const actions = {
    async Register({ dispatch }, User) {
        console.log('register', User)
        await axios.post('https://localhost:44307/api/authentication/register', null,
            { params: { username: User.username, password: User.password } })
            .then(function (response) {
                console.log(response)
            })
        await dispatch('LogIn', User)
    },

    async LogIn({ commit }, User) {
        console.log(User)
        await axios.post('https://localhost:44307/api/authentication', null,
            { params: { username: User.username, password: User.password } })
            .then(function (response) {
                console.log(response)
                commit('setUser', User.username)
                commit('setToken', response.data.token)
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

    setToken(state, token) {
        console.log('set token', token)
        state.token = token;
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