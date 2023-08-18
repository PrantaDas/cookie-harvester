const xpaths = require("./xpaths");

const sleep = async () => await new Promise((r) => setTimeout(r, 100));


async function getCookie(accounts, browser) {
    if (!accounts.length > 0) return null;
    try {
        const options = {
            // waitUntil: 'networkidle2',
            // timeout: 30000,
        };
        const account = accounts[0]
        const page = await browser.newPage();

        await page.setRequestInterception(true);

        await page.setDefaultNavigationTimeout(0);

        for (let i = 0; i < accounts.length; i++) {

            const account = accounts[i];

            page.on('dialog', async (dialog) => {
                console.log(dialog.message());
                await dialog.dismiss();
            });

            await page.goto('https://traders.td365.com/login');

            await page.waitForXPath(xpaths.login_username, { timeout: 5000 });

            await page.$eval(xpaths.login_username, (el) => el.value = account.email);

            await page.waitForXPath(xpaths.login_password, { timeout: 5000 });

            await page.$eval(xpaths.login_password, (el) => el.value = account.password);

            await page.waitForXPath(xpaths.login_button, { timeout: 5000 });

            await page.click(xpaths.login_button);

            await page.waitForNavigation();
        }
    }
    catch (err) {
        throw err;
    }
};

module.exports = getCookie;