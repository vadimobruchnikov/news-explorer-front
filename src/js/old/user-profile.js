import {getElement} from "../utils/utils";

export class UrerProfile {
  
  constructor(api, apiBaseUrl, apiToken, userPopup) {
    this.apiBaseUrl = apiBaseUrl;
    this.apiToken = apiToken;
    api.getUserInfo(this, userPopup, apiBaseUrl, apiToken);
  }
  render() {
    getElement('.user-info__name').textContent = this.name;
    getElement('.user-info__job').textContent = this.about;
    getElement('.user-info__photo').style.backgroundImage = `url(${this.avatar})`;
  }

}