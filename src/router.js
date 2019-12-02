import Vue from 'vue';
import TheViewer from './components/Viewer/TheViewer'
import Navigation from './components/TheNavbar'
import TheViewerUpload from './components/Viewer/TheViewerUpload'
import TheViewerPopup from './components/Viewer/TheViewerPopup'
import Login from './components/Login';
import firebase from './myFireBase';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [{
    path: '/',
    components:{
      main: TheViewer,
      nav: Navigation
    },
    meta: {
      requiresAuth: true,
      navigation: true,
    },
    children: [{
        path: '/upload',
        component: TheViewerUpload,
        meta: {
          requiresAuth: true,
          navigation: true,
        },
      },
    ]
  },
  {
    path: '/login',
    components:{
      main: Login,
      nav: Navigation
    },
    meta: {
      requiresGuest: true,
      navigation: false,
    }
  }
]


let router = new VueRouter({
  routes,
  mode: 'history',
})


router.beforeEach((to, from, next) => {

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!firebase.auth().currentUser) {
      next('/login');
    } else {
      next();
    }

  } else if (to.matched.some(record => record.meta.requiresGuest)) {
   
    if (firebase.auth().currentUser) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
})


export default router;
