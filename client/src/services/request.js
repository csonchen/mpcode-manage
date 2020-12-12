export const postData = (url, data = {}) => {
  const { method = 'GET', params = {} } = data
  const baseParams = {
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'content-type': 'application/json'
    },
    method,
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-referrer'
  }
  if (method === 'POST') {
    baseParams.body = JSON.stringify(params)
  }
  return fetch(url, baseParams)
  .then(response => response.json())
}