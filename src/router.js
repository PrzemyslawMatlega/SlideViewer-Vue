import Vue from 'vue';
import TheViewer from './components/Viewer/TheViewer'
import TheViewerUpload from './components/Viewer/TheViewerUpload'
import TheViewerPopup from './components/Viewer/TheViewerPopup'
import Login from './components/Login';
import firebase from './myFireBase';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

let routes = [{
    path: '/',
    component: TheViewer,
    meta: {
      requiresAuth: true
    },

    children: [{
        path: '/upload',
        component: TheViewerUpload,
        meta: {
          requiresAuth: true
        },
      },
    ]
  },
  {
    path: '/login',
    component: Login,
    meta: {
      requiresGuest: true
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
