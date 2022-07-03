class UserInfo {
  constructor ( {profileNameSelector, profileJobSelector} ) {
    this._profileNameSelector = profileNameSelector;
    this._profileJobSelector = profileJobSelector;
    this._profileNameElement = document.querySelector(`.${this._profileNameSelector}`);
    this._profileJobElement = document.querySelector(`.${this._profileJobSelector}`);
    this._userData = {};
  }

  getUserInfo() {
    this._userData[this._profileNameElement.id] = this._profileNameElement.textContent;
    this._userData[this._profileJobElement.id] = this._profileJobElement.textContent;

    return this._userData;
  }

  setUserInfo(data) {
    this._profileNameElement.textContent = data.name;
    this._profileJobElement.textContent = data.job;
  }
}

export default UserInfo;
