import puppeteer from 'puppeteer-extra';
import StealthPlugin from 'puppeteer-extra-plugin-stealth';
import Api from './utils/api';
import mapCookie from './utils/mapCookie';
import selector from './utils/selector';

puppeteer.use(StealthPlugin());

const api = new Api('eeXrVwSMXPZ4pJpwStuNyiUa7XxGZRX9');


export default async function main(accounts) {

  if (!accounts.length > 0) return {};

  const browser = await puppeteer.launch({
    slowMo: 100,
    timeout: 300000,
    headless: 'new',
    args: ['--start-maximized', '--disable-infobars',],
    ignoreDefaultArgs: ['--disable-save-password-bubble', '--enable-automation']
  });

  const context = browser.defaultBrowserContext();

  await context.overridePermissions(
    'https://traders.td365.com', ['geolocation', 'midi', 'notifications', 'camera', 'microphone', 'background-sync', 'ambient-light-sensor', 'accelerometer', 'gyroscope', 'magnetometer', 'accessibility-events', 'clipboard-read', 'clipboard-write', 'payment-handler', 'idle-detection', 'midi-sysex']);

  try {
    const cookieStore = {};
    outerLoop: for (let i = 0; i < accounts.length; i++) {
      try {
        const { accountId, email, password } = accounts[i];

        const { data: { access_token } } = await api.getToken(email, password);
        await api.login(access_token);
        const { data: { results } } = await api.getAccounts(access_token);
        const { id } = results.find((result) => result.account === accountId);
        const { data: { url: tokenUrl } } = await api.launch(id, access_token);
        const page = await browser.newPage();
        await page.goto(tokenUrl, {
          waitUntil: 'networkidle2',
        });
        const cookies = await page.cookies();
        if (!cookies) continue outerLoop;
        if (cookies) {
          const result = mapCookie(cookies);
          cookieStore[email] = result;
          const loginId = await page.$(selector.loginId);
          const value = await page.evaluate((el) => el.textContent, loginId);
          cookieStore[email].loginId = value.replace(/^\(|\)$/g, '');
          const logOutBtn = await page.$(selector.logOutBtn);
          await logOutBtn.click();

          await page.evaluate(() => {
            document.querySelectorAll(selector.modalClass)[0].click();
          });
        }
      }
      catch (e) {
        continue outerLoop;
      }
    }
    await browser.close();
    return cookieStore;

  } catch (err) {
    console.log(err);
    browser.close();
    return {};
  }
}