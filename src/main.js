import Vue from 'vue'
import VueResource from 'vue-resource';
import router from './router';
import App from './App.vue'
import firebase from './myFireBase';

Vue.use(VueResource);

firebase.auth().onAuthStateChanged(function (user) {

    new Vue({
      el: '#app',
      router,
      render: h => h(App)
    })
  
});
