import {inject} from 'aurelia-framework'
import {ProfileService} from '../../auth/profile-service'

const ProfileParser = {
  parse(p){ return p;}
}

@inject(ProfileService)
export class Index {
  profile = {};
  constructor(profileSvc) {
    this.profileSvc = profileSvc;
  }
  attached() {
    this.profileSvc.getProfile().then(p => {
      this.profile = p;
    });
  }
}
