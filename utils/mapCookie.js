/**
 * Maps and filters cookies to create a consolidated object containing the cookie string and token.
 *
 * @param {Array} cookies - An array of cookie objects with properties like name, value, etc.
 *
 * @returns {Object} Returns an object with a consolidated cookie string and token.
 *
 * @throws {Object} Returns an empty object if no cookies are provided.
 */

export default function mapCookies(cookies) {
  if (!cookies.length > 0) return {};

  const filteredCookies = cookies.filter(cookie =>
    cookie.name !== '_ga' && cookie.name !== '_ga_L14D3Z3R57' && !cookie.name.endsWith('_exp')
  );


  filteredCookies.sort((a, b) => {
    if (a.name === 'ASP.NET_SessionId') return -1;
    if (b.name === 'ASP.NET_SessionId') return 1;
    if (a.name === 'AWSALB') return 1;
    if (b.name === 'AWSALB') return -1;
    if (a.name === 'AWSALBCORS') return 1;
    if (b.name === 'AWSALBCORS') return -1;
    return 0;
  });

  const cookiePairs = [];

  filteredCookies.forEach(cookie => {
    const { name, value } = cookie;

    const existingIdx = cookiePairs.findIndex(c => c.name === name);
    if (existingIdx !== -1) {
      cookiePairs[existingIdx].value = value;
    } else {
      cookiePairs.push({ name, value });
    }
  });

  const cookieString = cookiePairs.map(cookie => `${cookie.name}=${cookie.value}`);

  const final = cookieString.join('; ');

  const token = final.split(' ')[1].split('=')[1].replace(';', '');

  const cookieObj = { cookie: final, token };

  return cookieObj;
}
