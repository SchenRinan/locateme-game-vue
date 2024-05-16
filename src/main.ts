import { createApp } from 'vue'
import "bootstrap/dist/css/bootstrap.min.css";
import App from './App.vue'
import router from './router'
import store from './store'

import 'leaflet/dist/leaflet.css';


createApp(App).use(store).use(router).mount('#app')

import 'leaflet/dist/leaflet.css';

import "bootstrap/dist/js/bootstrap.js"