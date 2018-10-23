// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import {Swipe, SwipeItem, Lazyload, Header, Button, Loadmore,Checklist,Cell,InfiniteScroll,Spinner,Toast,MessageBox} from 'mint-ui'
import MHeader from 'components/header/header'
import App from './App'
import router from './router'
import store from './store'
import './assets/style/index.styl'
import './assets/style/my-mint.styl'
import 'lib-flexible/flexible'
import FastClick from 'fastclick'
import 'font-awesome/css/font-awesome.css'
FastClick.attach(document.body);
Vue.config.productionTip = false;
Vue.component('Swipe', Swipe);
Vue.component('SwipeItem', SwipeItem);
Vue.component('mt-header', Header);
Vue.component('mt-button', Button);
Vue.component('mt-loadmore', Loadmore);
Vue.component('m-header', MHeader);
Vue.component('mt-checklist',Checklist);
Vue.component('mt-cell',Checklist);
Vue.component('mt-spinner', Spinner);
Vue.component('Toast', Toast);
Vue.component('MessageBox', MessageBox);
Vue.use(Lazyload);
Vue.use(InfiniteScroll);
import normalizeBooks from './dom/BooksDom'
Vue.prototype.normalizeBooks = normalizeBooks;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>'
})
