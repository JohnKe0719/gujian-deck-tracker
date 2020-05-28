// import Vue from 'vue'
// import Vuex from 'vuex'
// import CryptoJS from 'crypto-js'
// // import config from '../config/env.js'

// Vue.use(Vuex)

// export default new Vuex.Store({
//     state: {
//         dialog: {
//             contact: false
//         },
//         paper : null,
//         locale: null,
//         locale_key: 'locale',
//         toast: {
//             type : '',
//             messages : []
//         },
//         recaptcha : {
//             site_key : '6Lc1tycUAAAAAKhIfJEbbt5kcKCr83yUTZxkstiM'
//         },
//         access_token: null,
//         // cookie_name: config.cookie_prefix + 'sid'
//     },
//     actions: {
//         contactUs({ commit }, data) {
//             return new Promise((resolve, reject) => {
//                axios.post('/api/contact', data)
//                    .then(response => {
//                        resolve(response.data || {})
//                    }).catch(error => {
//                        reject(error.response)
//                    });
//             });
//         },
//         getSensorliveUser({ commit }, { token }) {
//             return new Promise((resolve, reject) => {
//                 return axios.get('/api/users/logged_in', {},{
//                         headers: { Authorization: 'Bearer ' + token }
//                     })
//                     .then(response => {
//                         console.log(response.data)
//                         resolve(response.data || {})
//                     }).catch(error => {
//                         //@todo log and alert
//                         reject(error.response)
//                     })
//             })
//         },
//         getAccessToken({ commit }, { username, password }) {
//             return new Promise((resolve, reject) => {
//                 axios.post('/oauth/token', {
//                     grant_type: 'password',
//                     client_id: '2',
//                     client_secret: 'fBnD3da4IhmChuWWwE8dMHzMLnBwIO9hhhgMyucB',
//                     username: username,
//                     password: password,
//                     scope: ''
//                 }).then(response => {
//                     const data = response.data || {}
//                     const access_token = data.access_token
//                     commit('setAccessToken', {
//                         token: access_token,
//                         expired: data.expires_in
//                     })
//                     resolve(access_token)
//                 }).catch(error => {
//                     reject(error.response)
//                 })
//             })
//         },
//         register({ commit }, { register }) {
//             return new Promise((resolve, reject) => {
//                 axios.post('/api/register', register)
//                 .then(response => {
//                    resolve(response.data || {})
//                 }).catch(error => {
//                    reject(error.response)
//                 });
//             });
//         },
//         forgotPassword({ commit }, {email}) {
//             return new Promise((resolve, reject) => {
//                 axios.post('/api/password/email', {
//                     email : email
//                 })
//                 .then(response => {
//                    resolve(response.data || {})
//                 }).catch(error => {
//                    reject(error.response)
//                 });
//             });
//         },
//         resetPassword({ commit }, data) {
//             return new Promise((resolve, reject) => {
//                 axios.post('/api/password/reset', data)
//                 .then(response => {
//                    resolve(response.data || {})
//                 }).catch(error => {
//                    reject(error.response)
//                 });
//             });
//         },
//     },
//     mutations: {
//         dialog(state, { name, value }) {
//             if (typeof state.dialog[name] !== 'undefined') {
//                 state.dialog[name] = value
//             }
//         },
//         locale(state, locale) {
//             window.localStorage.setItem(state.locale_key, locale)
//         },

//         setPaper( state, paper ){
//             state.paper = paper
//         },

//         setAccessToken(state, payload) {
//             //加密
//             var encrypt_token = CryptoJS.AES.encrypt(payload.token, 'sensorlive');

//             // 判斷是否已經有相同的cookie值。有的話，使舊的cookie過期
//             if (document.cookie.indexOf('') >= 0) {
//                 var uexpired_date = moment().subtract(1, 'day')
//                 const uexpires = "expires="+uexpired_date.toString()
//                 document.cookie = state.cookie_name + "=" + encrypt_token.toString() + "; path=/ ;" + uexpires
//             }
//             var expired_date = moment().add(payload.expired, 'second')
//             const expires = "expires=" + expired_date.toString()
//             document.cookie = state.cookie_name + "=" + encrypt_token.toString() + "; path=/ ; domain=.sensor.live; " + expires

//             state.access_token = encrypt_token.toString()
//         },
//         setError(state, message) {
//             state.toast.type = 'error'
//             if(Array.isArray(message)) {
//                 state.toast.messages = message
//             } else {
//                 state.toast.messages = [message]
//             }
//         },
//         setSuccess(state, message) {
//             state.toast.type = 'success'
//             if(Array.isArray(message)) {
//                 state.toast.messages = message
//             } else {
//                 state.toast.messages = [message]
//             }
//         },

//     },
//     getters: {

//         getLocale(state) {
//             return window.localStorage.getItem(state.locale_key) || state.locale
//         },
//         getRecaptchaSiteKey(state) {
//             return state.recaptcha.site_key
//         },
//         getAccessToken(state) {
//             var cookie_array = document.cookie.split(';')
//             var name = "laravel_token="
//             for(var i = 0; i < cookie_array.length; i++) {
//                 var cookie = cookie_array[i]
//                 while (cookie.charAt(0)==' ') cookie = cookie.substring(1);
//                 if (cookie.indexOf(name) == 0) {
//                     state.access_token = cookie.substring(name.length,cookie.length)
//                 }

//             }
//             return state.access_token
//         },
//         getPaper(state){
//             return state.paper
//         },
//     }
// })
