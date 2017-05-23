
import AWS from 'AWS'
import {PLATFORM} from 'aurelia-pal'
import {inject} from 'aurelia-framework'
import {Storage} from './../../common/storage'
import jwt from './../jwt'

const ROLE_MAP = {
  "Anon": "arn:aws:iam::277618971297:role/cv_overkill_unauth_role",
  "Authd": "arn:aws:iam::277618971297:role/cv_overkill_auth_role",
  "Admin": "arn:aws:iam::277618971297:role/cv_overkill_admin_role"
}

const ROLE_HIERARCHY = ["Admin","Authd","Anon"];
let congitoOauthToken;
let role = "Anon";

function getOauthToken() {
  if(congitoOauthToken && !jwt.tokenExpired(congitoOauthToken)) return Promise.resolve(congitoOauthToken);
  else {
    return new Promise((resolve, reject) => {
      AWS.config.credentials.cognito.getOpenIdToken((e,t) => {
        if(e) reject(e);
        else {
          congitoOauthToken = t.Token;
          resolve(t.Token)
        }
      });
    });
  }
}


function setRole(index){
  return new Promise((resolve, reject) => {
    index = index || 0;
    if(index >= ROLE_HIERARCHY.length){
      throw 'Unable to authorize for any available roles`'
    }
    let targetAwsRole = ROLE_MAP[ROLE_HIERARCHY[index]]
    if(!targetAwsRole){
      throw `Cannot find AWS role for application role ${ROLE_HIERARCHY[index]}`
    }
    return getOauthToken().then(oauth => {
      AWS.config.credentials.sts.assumeRoleWithWebIdentity({
        WebIdentityToken: oauth,
        RoleArn: targetAwsRole,
        RoleSessionName: ROLE_HIERARCHY[index]
      }, (e,t) => {
        if(e) {
          congitoOauthToken = undefined;
          resolve(setRole(index + 1));
        }
        else {
          role = ROLE_HIERARCHY[index]
          AWS.config.credentials = new AWS.Credentials(t.Credentials.AccessKeyId, t.Credentials.SecretAccessKey, t.Credentials.SessionToken);
          resolve(oauth);
        }
      })
    });
  });
}

@inject(Storage)
export class AwsRoleManager {
  static initialize(creds){
    // aws.cognito.identity-id.eu-west-1:ed8b4abf-c3e3-4497-a27d-dfa3c548287c
    return new Promise((resolve, reject) => {
      congitoOauthToken = undefined;
      AWS.config.credentials = new AWS.CognitoIdentityCredentials({
        IdentityPoolId: 'eu-west-1:ed8b4abf-c3e3-4497-a27d-dfa3c548287c'
      });
      if(creds){
        AWS.config.credentials.params.Logins = creds;
        AWS.config.credentials.expired = true;
      }
      AWS.config.credentials.refresh((e) => {
        if(e) {
          resolve(AwsRoleManager.initialize())
        } else {
          resolve(setRole());
        }
      });
    })
  }
  constructor(storage){
    this.storage = storage;
  }
  setToken(provider, token){
    let creds = {};
    creds[provider] = token;
    return AwsRoleManager.initialize(creds);
  }
  isAuthenticated() {
    var parsedJwt = jwt.parseJwt(congitoOauthToken);
    return parsedJwt && !jwt.tokenExpired(parsedJwt) && role !== "Anon";
  }
  isAdmin() {
    return role === "Admin"
  }
}
