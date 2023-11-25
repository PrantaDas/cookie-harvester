import axios from 'axios';

/**
 * Class representing an API client for authentication and interacting with the TD365 portal.
 */
module.exports = class Api {
  _client_id;

  /**
  * Create a new instance of the API client.
  *
  * @param {string} _client_id - The client ID used for authentication (default: 'eeXrVwSMXPZ4pJpwStuNyiUa7XxGZRX9').
  */
  constructor(_client_id) {
    this._client_id = _client_id || 'eeXrVwSMXPZ4pJpwStuNyiUa7XxGZRX9';
  }

  /**
  * Get the authentication token using the provided username and password.
  *
  * @param {string} username - The username for authentication.
  * @param {string} password - The password for authentication.
  *
  * @returns {Promise} A promise that resolves to the authentication token.
  */
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

  /**
   * Log in using the provided access token.
   *
   * @param {string} accessToken - The access token obtained during authentication.
   *
   * @returns {Promise} A promise representing the login operation.
   */
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

  /**
 * Get the accounts associated with the provided token and user ID.
 *
 * @param {string} token - The access token for authentication.
 * @param {string} id - The user ID.
 *
 * @returns {Promise} A promise that resolves to the user accounts.
 */
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


  /**
  * Launch the specified account using the provided account ID and ID token.
  *
  * @param {string} accountId - The account ID to launch.
  * @param {string} idToken - The ID token for authentication.
  *
  * @returns {Promise} A promise representing the launch operation.
  */
  asyn
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

  /**
   * Get the header information from the specified URL.
   *
   * @param {string} url - The URL to retrieve header information from.
   *
   * @returns {Promise} A promise that resolves to the header information.
   */
  async getHeader(url) {
    return axios(url, { method: 'GET' });
  }

};