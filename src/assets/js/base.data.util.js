import {config} from '../../assets/js/config';
import {myAxios} from '../../assets/js/ext.axios';

var baseDataUtil = {
  //1.获取验证码
  getVcode : function (param,successCallback,errorCallback) {
    var url = config.url.sendSms;
    myAxios.post(url,param,successCallback,errorCallback);
  },
  //2.记录用户操作日志
  RecordUserOperation : function (param,successCallback,errorCallback) {
    var url = config.url.userOperationRecord;
    myAxios.postWithoutCallback(url,param,successCallback,errorCallback);
  },


};
export {
  baseDataUtil
}
