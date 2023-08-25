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