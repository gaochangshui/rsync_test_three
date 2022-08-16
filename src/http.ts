import { Loading } from '@element-plus/icons';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { ElLoading,ElMessage } from 'element-plus';

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
axios.interceptors.request.use((config:AxiosRequestConfig) => {
    
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
})


// 响应拦截
axios.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, error => {
  // 错误提醒
  ElMessage({
    type: 'error',
    showClose: true,
    dangerouslyUseHTMLString: true,
    message: "データ抽出失敗しました",
  })

  return Promise.reject(error);
})

export default axios;