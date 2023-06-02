/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */


// Components
import App from './App.vue';
import Home from './Home.vue';
import Film from './components/Film.vue'

// Composables
import { createApp } from 'vue';
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';

// Plugins
import { registerPlugins } from './plugins';
import vuetify from './plugins/vuetify';

// Axios
import axios from 'axios';
import VueAxios from 'vue-axios';


const routes: Array<RouteRecordRaw> = [
    { path: '/', component: Home },
    { path: '/:id', component: Film }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);

registerPlugins();

app.use(vuetify).use(VueAxios, axios).use(router).mount('#app');

