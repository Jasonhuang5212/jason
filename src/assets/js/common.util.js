import {config} from '../../assets/js/config';
import {myAxios} from '../../assets/js/ext.axios';

(function () {
  // 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
  Date.prototype.pattern = function (fmt) {
    if(!fmt){
      fmt = 'yyyy-MM-dd hh:mm';
    }
    var o = {
      "M+": this.getMonth() + 1, //月份
      "d+": this.getDate(), //日
      "h+": this.getHours(), //小时
      "m+": this.getMinutes(), //分
      "s+": this.getSeconds(), //秒
      "q+": Math.floor((this.getMonth() + 3) / 3), //季度
      "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
})();

var class2type = {};
var toString = class2type.toString;
var hasOwn = class2type.hasOwnProperty;

//公共方法
var util = {
  noop: function() {},
  type: function( obj ) {
    if ( obj == null ) {
      return obj + "";
    }
    // Support: Android < 4.0, iOS < 6 (functionish RegExp)
    return typeof obj === "object" || typeof obj === "function" ?
      class2type[ toString.call(obj) ] || "object" :
      typeof obj;
  },
  isArray: Array.isArray,
  isFunction: function( obj ) {
    return this.type(obj) === "function";
  },
  isWindow: function( obj ) {
    return obj != null && obj === obj.window;
  },
  isPlainObject: function( obj ) {
    // Not plain objects:
    // - Any object or value whose internal [[Class]] property is not "[object Object]"
    // - DOM nodes
    // - window
    if ( this.type( obj ) !== "object" || obj.nodeType || this.isWindow( obj ) ) {
      return false;
    }

    if ( obj.constructor &&
      !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
      return false;
    }

    // If the function hasn't returned already, we're confident that
    // |obj| is a plain object, created by {} or constructed with new Object
    return true;
  },
  isEmptyObject: function( obj ) {
    var name;
    for ( name in obj ) {
      return false;
    }
    return true;
  },
  /**
   *  用于将一个或多个对象的内容合并到目标对象
   *  extend({a:1},{b:2}); => {a: 1, b: 2}
   *
   * */
  extend: function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    if ( typeof target === "boolean" ) {
      deep = target;
      target = arguments[ i ] || {};
      i++;
    }

    if ( typeof target !== "object" && !this.isFunction(target) ) {
      target = {};
    }

    if ( i === length ) {
      target = this;
      i--;
    }

    for ( ; i < length; i++ ) {
      if ( (options = arguments[ i ]) != null ) {
        for ( name in options ) {
          src = target[ name ];
          copy = options[ name ];

          if ( target === copy ) {
            continue;
          }

          if ( deep && copy && ( this.isPlainObject(copy) || (copyIsArray = this.isArray(copy)) ) ) {
            if ( copyIsArray ) {
              copyIsArray = false;
              clone = src && this.isArray(src) ? src : [];

            } else {
              clone = src && this.isPlainObject(src) ? src : {};
            }

            target[ name ] = this.extend( deep, clone, copy );

          } else if ( copy !== undefined ) {
            target[ name ] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  },

  checkInput: {
    money: function (event) {
      var target = event.target;
      var val = target.value;
      if (val == '.') {
        target.value = '';
        return target.value;
      }
      var regStrs = [
        ['^0(\\d+)$', '$1'], //禁止录入整数部分两位以上，但首位为0
        ['[^\\d\\.]+$', ''], //禁止录入任何非数字和点
        ['\\.(\\d?)\\.+', '.$1'], //禁止录入两个以上的点
        ['^(\\d+\\.\\d{2}).+', '$1'] //禁止录入小数点后两位以上
      ];
      for (var i = 0; i < regStrs.length; i++) {
        var reg = new RegExp(regStrs[i][0]);
        target.value = target.value.replace(reg, regStrs[i][1]);
      }
      return target.value;
    },
  } ,
  money: {
    fen2Yuan: function (fen) {
      var _self = this,
          yuan = 0;
      yuan = _self.toFixed2(fen / 100);
      return yuan;
    },
    yuan2Fen: function (yuan) {
      var fen = 0;
      fen = yuan * 100;
      return fen;
    },
    toFixed2: function(num) {
      return parseFloat(num.toString().replace(/(\.\d\d)\d+$/, '$1'));//保留两位小数,直接舍弃第三位小数
    }
  },
  checkIsMobile : function(mobile) {// 验证手机号
    if(mobile == ""){
      return false;
    }
    if(isNaN(mobile) || (mobile.length != 11)) {
      return false;
    }
    var _d = /^1[23456789][0123456789]\d{8}$/g;
    var _l = /^1[34578][012568]\d{8}$/g;
    var _y = /^(134[012345678]\d{7}|1[34578][012356789]\d{8})$/g;
    // var reg =/^0{0,1}(13[0-9]|15[0-9]|18[0-9])[0-9]{8}$/;
    if(_d.test(mobile)) {
      return true;
    }
    if(_l.test(mobile)) {
      return true;
    }
    if(_y.test(mobile)) {
      return true;
    }
    return false;
  },

  url: {
    //获取hash中的参数值(#)
    getParam : function(param){
      var reg = new RegExp("(^|&?)" + param + "=([^&]*)(&|$)", "i");
      var r = window.location.hash.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]); return null;
    },

    //获取非hash中的参数值
    getParam_default : function(param) {
      var reg = new RegExp("(^|&)" + param + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURIComponent(r[2]);
      return null;
    },

  },
  parseStrDate: function (val) { // 转换字符串时间为Date对象
    if (typeof val === 'string') {
      val = val.replace(/-/g, '/');
    }
    return new Date(val);
  },

};
export {
  util
}
