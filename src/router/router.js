import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../components/Home.vue';
import About from '../components/About.vue';

Vue.use(VueRouter);

// since the SPA starts on the server, we need to be able to create a new router instance on demand
export function createRouter () {
  return new VueRouter({
    mode: 'history',
    routes: [
      { path: '/', component: Home },
      { path: '/about', component: About }
    ]
  });
}
