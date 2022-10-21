import axios from 'axios';
import { ElMessage } from 'element-plus';
import router from './router';

// let loading: any;
// const outList:string[] = ["/qcdapi/projectlist","/apiv1/employeelist","/qcdapi/EmployeeMandays"];
// const startLoading = () => {

//   interface Options {
//     lock: boolean;
//     text: string;
//     background: string;
//   }

//   const options: Options = {
//     lock: true,
//     text: "loading...",
//     background: 'rgba(0,0,0,0.7)'
//   }
//   loading = ElLoading.service(options);
// }

// const endLoading = () => {
//   if(loading)loading.close();
// }

// 请求拦截
axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.token = token;
  }
// 加载
//  if(!(outList.indexOf(config)>-1)){
//     startLoading();
//  }
//   if (config.method === 'post') {
//     config.data = {
//       ...config.data,
//       _t:Math.random()// 时间戳
//     }
//   } else if (config.method === 'get') {
//     config.params = {
//       _t: Math.random(), // 随机数
//       ...config.params
//     }
//   }
  return config;
},(error) => {
  return Promise.reject(error);
});


// 响应拦截
axios.interceptors.response.use((response) => {
  if(response.data.Success==false){
    router.replace({ name: 'login' });
    localStorage.clear('token');
    
  }
  return response;
}, error => {
  if (error.response) {
    switch (error.response.status) {
        case 401:
            // 返回 401 清除 token 信息并跳转到登录页面
            router.replace({ name: 'login' });
            localStorage.clear('token');
    }
}
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: 'データ抽出失敗しました'
  });

  return Promise.reject(error);
});

export default axios;