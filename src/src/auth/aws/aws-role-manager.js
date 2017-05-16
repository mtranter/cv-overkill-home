import AWS from 'AWS'

const ROLE_MAP = {
  "unauthd": "",
  "authd": "",
  "admin": ""
}

export class AwsRoleManager {
  setToken(provider, token){
    return new Promise((resolve, reject) => {
      AWS.config.credentials.params.Logins = {};
      AWS.config.credentials.params.Logins[provider] = token;
      AWS.config.credentials.expired = true;
      AWS.config.credentials.refresh(() => {
        resolve();
      });
    });
  }
}
