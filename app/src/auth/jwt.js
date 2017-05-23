export default {
  parseJwt: function(token) {
    if (token.split('.').length !== 3) {
      throw 'Invalid JWT';
    }

    let base64Url = token.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
  },
  tokenExpired: function(jwt) {
    if(typeof jwt === "string"){
      jwt = this.parseJwt(jwt);
    }
    return Math.round(new Date().getTime() / 1000) > jwt.exp;
  }
}
