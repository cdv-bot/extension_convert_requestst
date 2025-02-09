/* eslint-disable no-undef */
async function getData() {
  return new Promise((resolve) => {
    chrome.storage.local.get(null, (items) => {
      resolve(items.store);
    });
  })
} 

export const store = {
  async get(key = '') {
    const data = await getData()
    
    return key === '' ? data : data[key]
  },

  set(data ) {
    console.log(data);
    chrome.storage.local.set(data)
  },

  clear() {
    chrome.storage.local.clear()
  }
}
