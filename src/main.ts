import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus';
import SvgIcon from '@/components/SvgIcon/index.vue' // svg组件
import axios from 'axios';
import VueAxios from 'vue-axios';
import 'element-plus/dist/index.css';
import './assets/icons'
import VueClipboard from 'vue-clipboard2';
import zhCn from 'element-plus/es/locale/lang/zh-cn'


const app = createApp(App)
app.component('SvgIcon', SvgIcon);
axios.defaults.withCredentials = true;
app.use(VueAxios, axios);
app.use(ElementPlus, {
    locale: zhCn,
  });
app.use(router).mount('#app')
app.use(VueClipboard)
