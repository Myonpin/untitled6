import axios from "axios";
import {message} from "antd";

/*
能发送异步ajax请求的函数类型的模块
封装axios库
函数的返回值是promise对象
1.优化：统一处理请求异常
  在外层抱一个自己创建的promise对象
  在请求出错时，不reject（error）而是错误提示
2.优化：异步得到的不是response，而是response的data
  在请求成功resolve时候：resolve（response.data）
 */


export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve,reject)=>{
    let promise
    //1.执行异步ajax请求
    //2.如果成功了调用resolve（value）
    //3.如果失败了，不调用reject（reason），而是通过提示异常信息
    if (type === 'GET') {
      promise =  axios.get(url, {
        params: data
      })
    } else {
      promise =  axios.post(url, data)
    }
    promise.then(response=>{
      resolve(response.data)
    }).catch(error=>{
      message.error('请求出错了'+error.message)
    })
  })
}

ajax('/login', {username: 'Tom', password: '12345'}, 'POST').then()
ajax('/manage/user/add', {username: 'Tom', password: '12345', phone: '13333333333'}, 'POST').then()


