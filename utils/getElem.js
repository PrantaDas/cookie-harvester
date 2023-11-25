
/**
 * Asynchronously waits for the specified XPath element to appear on the page and returns it.
 *
 * @param {string} path - The XPath expression to locate the desired element.
 * @param {Object} page - The Puppeteer page object on which to search for the element.
 *
 * @returns {Object} Returns the first element matching the XPath expression.
 * If the element is not found, returns `false`.
 *
 * @throws {Error} Throws an error if there is an issue waiting for the element or if an error occurs during the process.
 */
export default async function getElem(path, page) {

  try {
    await page.waitForXPath(path);
    return (await page.$x(path))[0];
  }
  catch (e) {
    console.log(e);
    return false;
  }
}