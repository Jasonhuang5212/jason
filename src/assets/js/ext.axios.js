import axios from 'axios';
import Qs from 'qs';
import {config} from '../../assets/js/config';
import {util} from '../../assets/js/common.util';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
import router from '../../router'
import {storage} from "./storage";

var myAxios = {
  get : function (url,param,successCallback, errorCallback) {
    var _self = this;
    url = config.baseURL + url;
    if(typeof(param) === 'function'){
      successCallback = param;
      param = {};
    }
    util.extend(param,config.baseParam,{device_number : util.url.getParam_default('deviceid')});

    //param = Qs.stringify(param);

    axios({
      url:url,
      method:'get',
      params: param,
      timeout: 30 * 1000,//30 秒请求超时
    })
      .then(function (response) {
        Indicator.close();
        var data = response.data;
        switch (data.back_status){//0-失败，1-成功，-1-未登录
          case '0'://失败
            Toast({message: data.back_msg, position: 'bottom', duration: 2500});
            typeof errorCallback === 'function' && errorCallback.call(null);
            break;
          case '1'://成功
            successCallback(data);
            break;
          case '-1'://未登录
            _self.toLogin();
            break;
          default://没办法了，只能走这个兼容下不按通用格式来返回结果的接口
            successCallback(data);
            break;
        }
      })
      .catch(function (error) {
        _self.handleError(error);
        Indicator.close();
        typeof errorCallback === 'function' && errorCallback.call(null);
      });
  },
  post : function (url,param,successCallback, errorCallback) {
    var _self = this;
    url = config.baseURL + url;
    if(typeof(param) === 'function'){
      successCallback = param;
      param = {};
    }
    util.extend(param,config.baseParam,{device_number : util.url.getParam_default('deviceid')});
    param = Qs.stringify(param);
    axios({
      url:url,
      method:'post',
      data: param,
      timeout: 30 * 1000,//30 秒请求超时
    })
      .then(function (response) {
        Indicator.close();
        var data = response.data;
        switch (data.back_status){//0-失败，1-成功，-1-未登录
          case '0'://失败
            Toast({message: data.back_msg, position: 'bottom', duration: 2500});
            typeof errorCallback === 'function' && errorCallback.call(null);
            break;
          case '1'://成功
            successCallback(data);
            break;
          case '-1'://未登录
            _self.toLogin();
            break;
          default://没办法了，只能走这个兼容下不按通用格式来返回结果的接口
            successCallback(data);
            break;
        }
      })
      .catch(function (error) {
        Indicator.close();
        _self.handleError(error);
        typeof errorCallback === 'function' && errorCallback.call(null);
      });
  },
  postWithoutCallback : function (url,param) {
    var _self = this;
    url = config.baseURL + url;
    if(typeof(param) === 'function'){
      successCallback = param;
      param = {};
    }
    util.extend(param,config.baseParam,{device_number : util.url.getParam_default('deviceid')});
    param = Qs.stringify(param);
    axios({
      url:url,
      method:'post',
      data: param,
      timeout: 30 * 1000,//30 秒请求超时
    });
  },
  handleError: function (error) {
    Toast({
      message: '请求失败',
      position: 'bottom',
      duration: 2500
    });
  },
  toLogin: function () {

    storage.removeUserInfo();

    router.replace({
      name: 'login',
      replace: true
    });
  }
};
export {
  myAxios
}
