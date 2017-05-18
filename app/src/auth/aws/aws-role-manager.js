
import AWS from 'AWS'
import {PLATFORM} from 'aurelia-pal'
import {inject} from 'aurelia-framework'
import {Storage} from './../../common/storage'

const ROLE_MAP = {
  "Anon": "arn:aws:iam::277618971297:role/cv_overkill_unauth_role",
  "Authd": "arn:aws:iam::277618971297:role/cv_overkill_auth_role",
  "Admin": "arn:aws:iam::277618971297:role/cv_overkill_admin_role"
}

const ROLE_HIERARCHY = ["Admin","Authd","Anon"];
let token;

function getOauthToken() {
  if(token) return Promise.resolve(token);
  else {
    return new Promise((resolve, reject) => {
      AWS.config.credentials.cognito.getOpenIdToken((e,t) => {
        if(e) reject(e);
        else {
          token = t;
          resolve(t)
        }
      });
    });
  }
}

function setRole(index){
  return new Promise((resolve, reject) => {
    try{
      index = index || 0;
      if(index >= ROLE_HIERARCHY.length){
        throw 'Unable to authorize for any available roles`'
      }
      let targetAwsRole = ROLE_MAP[ROLE_HIERARCHY[index]]
      if(!targetAwsRole){
        throw `Cannot find AWS role for application role ${ROLE_HIERARCHY[index]}`
      }
      getOauthToken().then(t => {
        AWS.config.credentials.sts.assumeRoleWithWebIdentity({
          WebIdentityToken: t.Token,
          RoleArn: targetAwsRole,
          RoleSessionName: ROLE_HIERARCHY[index]
        }, (e,t) => {
          if(e) resolve(setRole(index + 1));
          else resolve(t);
        })
      }).catch(e => {
        console.log(e);
        reject(e);
      });
    }catch(e){
      reject(e);
    }
  });
}

@inject(Storage)
export class AwsRoleManager {
  static initialize(){
    // aws.cognito.identity-id.eu-west-1:ed8b4abf-c3e3-4497-a27d-dfa3c548287c
    return new Promise((resolve, reject) => {
      let storage = new Storage();
      let creds = storage.get('aws.credentials');
      if(creds){
        AWS.config.credentials = new AWS.Credentials(creds);
        AWS.config.credentials.refresh((err) => {
          if(err){
              storage.remove('aws.credentials');
              resolve(AwsRoleManager.initialize());
          }else {
            resolve();
          }
        });
      } else {
        AWS.config.credentials = new AWS.CognitoIdentityCredentials({
          IdentityPoolId: 'eu-west-1:ed8b4abf-c3e3-4497-a27d-dfa3c548287c'
        });
        resolve();
      }
    })
  }
  constructor(storage){
    this.storage = storage;
  }
  setToken(provider, token){
      AWS.config.credentials.params.Logins = {};
      AWS.config.credentials.params.Logins[provider] = token;
      AWS.config.credentials.expired = true;
      return new Promise((resolve,reject) => {
        AWS.config.credentials.refresh(() => {
          return setRole().then(creds => {
            let credsOps = {
              accessKeyId: creds.Credentials.AccessKeyId,
              secretAccessKey:creds.Credentials.SecretAccessKey,
              sessionToken: creds.Credentials.SessionToken
            };
            this.storage.set('aws.credentials',credsOps);
            AWS.config.credentials = new AWS.Credentials(credsOps);
            AWS.config.credentials.refresh(resolve);
          });
        });
      });
  }
  isAuthenticated() {
    return (!!AWS.config.credentials) && (!AWS.config.credentials.expired)
  }
}