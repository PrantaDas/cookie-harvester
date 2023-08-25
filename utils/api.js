import axios from 'axios';

module.exports = class Api {
  _client_id;

  constructor(_client_id) {
    this._client_id = _client_id || 'eeXrVwSMXPZ4pJpwStuNyiUa7XxGZRX9';
  }

  async getToken(
    username,
    password
  ) {
    return await axios('https://td365.eu.auth0.com/oauth/token', {
      'headers': {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'content-type': 'application/json',
        'sec-ch-ua': '\'Not/A)Brand\';v=\'99\', \'Google Chrome\';v=\'115\', \'Chromium\';v=\'115\'',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '\'Linux\'',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      data: {
        client_id: this._client_id,
        realm: 'Username-Password-Authentication',
        scope: 'openid',
        grant_type: 'http://auth0.com/oauth/grant-type/password-realm',
        username,
        password
      },
      method: 'POST'
    });
  }

  async login(accessToken) {
    return axios('https://portal-api.tradenation.com/TD365/user/6039609/login/', {
      'headers': {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${accessToken}`,
        'content-type': 'application/json',
        'sec-ch-ua': '\'Not/A)Brand\';v=\'99\', \'Google Chrome\';v=\'115\', \'Chromium\';v=\'115\'',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '\'Linux\'',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      method: 'POST'
    });
  }

  async getAccounts(token, id) {
    return axios('https://portal-api.tradenation.com/TD365/user/6039609/accounts/', {
      'headers': {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${token}`,
        'sec-ch-ua': '\'Not/A)Brand\';v=\'99\', \'Google Chrome\';v=\'115\', \'Chromium\';v=\'115\'',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '\'Linux\'',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
    });
  }

  async launch(
    accountId,
    idToken
  ) {
    return await axios(
      `https://portal-api.tradenation.com/TD365/user/${accountId}/launch/`, {
      'headers': {
        'accept': '*/*',
        'accept-language': 'en-US,en;q=0.9',
        'authorization': `Bearer ${idToken}`,
        'sec-ch-ua': '\'Not/A)Brand\';v=\'99\', \'Google Chrome\';v=\'115\', \'Chromium\';v=\'115\'',
        'sec-ch-ua-mobile': '?0',
        'sec-ch-ua-platform': '\'Linux\'',
        'sec-fetch-dest': 'empty',
        'sec-fetch-mode': 'cors',
        'sec-fetch-site': 'cross-site'
      },
      method: 'GET'
    });
  }

  async getHeader(url) {
    return axios(url, { method: 'GET' });
  }

};