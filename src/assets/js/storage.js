const UserInfoKey = 'DK-Info';

var storage = {
  setProductId: function (id) {
    sessionStorage.setItem('productId', id);
  },
  getProductId: function () {
    return sessionStorage.getItem('productId');
  },
  cleanProductId: function () {
    sessionStorage.removeItem('productId');
  },

  getUserInfo: function () {
    return JSON.parse(localStorage.getItem(UserInfoKey) || 'null');
  },
  setUserInfo: function (info) {
    localStorage.setItem(UserInfoKey, JSON.stringify(info));
  },
  removeUserInfo: function () {
    localStorage.removeItem(UserInfoKey);
  },

};
export {
  storage
}

