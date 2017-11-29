import axios from "axios";
import qs from "qs";
import { message } from 'antd';
import { Route, Redirect } from 'react-router';

const Fetch = axios.create({
  baseURL: "/", // 因为我本地做了反向代理
  timeout: 10000,
  responseType: "json",
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
  }
});
//POST传参序列化(添加请求拦截器)
Fetch.interceptors.request.use(
  config => {
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }

    // 若是有做鉴权token , 就给头部带上token
    if (localStorage.getItem("token")) {
      config.headers.Authorization = localStorage.getItem("token");
    }
    return config;
  },
  error => {
    message.error(error.data.error.message);
    return Promise.reject(error.data.error.message);
  }
);

//返回状态判断(添加响应拦截器)
Fetch.interceptors.response.use(
  res => {
    //对响应数据做些事
    // if (res.data && res.data.code == 1) {
    //   message.error(res.data.error.message.message
    //     ? res.data.error.message.message
    //     : res.data.error.message);
    //   return Promise.reject(res.data.error.message);
    // }
    return res;
  },
  error => {
    // 用户登录的时候会拿到一个基础信息,比如用户名,token,过期时间戳
    // 直接丢localStorage或者sessionStorage
    if (!window.localStorage.getItem("loginUserBaseInfo")) {
    //   // 若是接口访问的时候没有发现有鉴权的基础信息,直接返回登录页
    //   router.push({
    //     path: "/login"
    //   });
        <Redirect to="/login"/>
    } else {
      // 若是有基础信息的情况下,判断时间戳和当前的时间,若是当前的时间大于服务器过期的时间
      // 乖乖的返回去登录页重新登录
      let lifeTime =
        JSON.parse(window.localStorage.getItem("loginUserBaseInfo")).lifeTime *
        1000;
      let nowTime = new Date().getTime(); // 当前时间的时间戳
      console.log(nowTime, lifeTime);
      console.log(nowTime > lifeTime);
      if (nowTime > lifeTime) {
        message.error("登录状态信息过期,请重新登录");
        // router.push({
        //   path: "/login"
        // });
        <Redirect to="/login"/>
      } else {
        // 下面是接口回调的satus ,因为我做了一些错误页面,所以都会指向对应的报错页面
        if (error.response.status === 403) {
        //   router.push({
        //     path: "/error/403"
        //   });
            <Redirect to="/error/403"/>
        }
        if (error.response.status === 500) {
        //   router.push({
        //     path: "/error/500"
        //   });
            <Redirect to="/error/403"/>
        }
        if (error.response.status === 502) {
        //   router.push({
        //     path: "/error/502"
        //   });
        <Redirect to="/error/502"/>
        }
        if (error.response.status === 404) {
        //   router.push({
        //     path: "/error/404"
        //   });
            <Redirect to="/error/404"/>
        }
      }
    }
    // 返回 response 里的错误信息
    let errorInfo =  error.data.error ? error.data.error.message : error.data;
    return Promise.reject(errorInfo);
  }
);

export default Fetch;
// 对axios的实例重新封装成一个plugin ,方便 Vue.use(xxxx)
// export default {
//   install: function(Vue, Option) {
//     Object.defineProperty(Vue.prototype, "$http", { value: Axios });
//   }
// };