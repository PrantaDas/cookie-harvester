const puppeteer = require('puppeteer-extra')
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const getCookie = require('./utils/getCookie');

puppeteer.use(StealthPlugin());

const accounts = [
    {
        email: "zozx@gmail.com",
        password: "Zozx@2023"
    }
];


async function main() {

    const browser = await puppeteer.launch({
        // slowMo: 100,
        // timeout: 300000,
        headless: false,
        args: ['--start-maximized', '--disable-infobars',],
        ignoreDefaultArgs: ['--disable-save-password-bubble', '--enable-automation'],
        protocolTimeout: 240000,
    });

    const context = await browser.defaultBrowserContext();

    await context.overridePermissions(
        'https://traders.td365.com', [
        "geolocation", "midi", "notifications", "camera", "microphone", "background-sync", "ambient-light-sensor", "accelerometer", "gyroscope", "magnetometer", "accessibility-events", "clipboard-read", "clipboard-write", "payment-handler", "idle-detection", "midi-sysex"
    ]);

    try {

        await getCookie(accounts, browser);

    } catch (err) {
        browser.close();
        throw err;
    }
};

main();