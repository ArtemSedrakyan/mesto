class UserInfo {
  constructor ( {profileNameSelector, profileJobSelector, profileAvatarSelector }) {
    this._profileNameSelector = profileNameSelector;
    this._profileJobSelector = profileJobSelector;
    this._profileAvatarSelector = profileAvatarSelector;
    this._profileNameElement = document.querySelector(`.${this._profileNameSelector}`);
    this._profileJobElement = document.querySelector(`.${this._profileJobSelector}`);
    this._profileAvatarElement = document.querySelector(`.${this._profileAvatarSelector}`);
    this._userData = {};
  }

  getUserInfo() {
    this._userData[this._profileNameElement.id] = this._profileNameElement.textContent;
    this._userData[this._profileJobElement.id] = this._profileJobElement.textContent;
    this._userData[this._profileAvatarElement.id] = this._profileAvatarElement.src;

    return this._userData;
  }

  setUserInfo(data) {
    this._profileNameElement.textContent = data.name;
    this._profileJobElement.textContent = data.about;
    this._id = data._id;
  }

  setUserAvatar(link) {
    this._profileAvatarElement.src = link;
  }

  getUserId() {
    return this._id;
  }
}

export default UserInfo;
