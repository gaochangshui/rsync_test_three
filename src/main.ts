import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue' // svg组件
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-plus/dist/index.css';
import './assets/icons'
const app = createApp(App)
app.component('SvgIcon', SvgIcon);
axios.defaults.withCredentials = true;
app.use(VueAxios, axios);
app.use(ElementPlus);
app.use(router).mount('#app')
