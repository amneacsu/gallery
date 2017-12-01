const readCache = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const writeCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetch = (url, options = {}) => {
  return new Promise((resolve, reject) => {
    if (options.cache) {
      const cached = readCache(url);

      if (cached) {
        return resolve(cached);
      }
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    if (options.headers) {
      xhr.setRequestHeader('Authorization', 'Client-ID 6a417df13aa3f62');
    }
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (options.cache) {
          writeCache(url, response);
        }
        resolve(response);
      };

      if (xhr.status === 404) {
        resolve(null);
      }
    };

    xhr.onerror = () => {
      reject({
        status: xhr.status,
        statusText: xhr.statusText,
      });
    };
  });
};

export const getVideoUrl = (src) => {
  let match = src.match(/gfycat\.com\/+([\w]+)/);

  if (match) {
    const id = match[1];

    const d = fetch(`https://gfycat.com/cajax/get/${id}`);
    return d.gfyItem.webmUrl;
  }

  return src;
};
