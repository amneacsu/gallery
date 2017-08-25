const readCache = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

const writeCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const fetch = (url, cache = true) => {
  return new Promise((resolve, reject) => {
    if (cache) {
      const cached = readCache(url);

      if (cached) {
        return resolve(cached);
      }
    }

    const xhr = new XMLHttpRequest();

    xhr.open('GET', url);
    xhr.send();

    xhr.onload = () => {
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        if (cache) {
          writeCache(url, response);
        }
        resolve(response);
      };
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
