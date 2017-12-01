import { fetch } from 'core/api';

const getGfyUrl = (url) => {
  let match = url.match(/gfycat\.com\/+([\w]+)/);
  const id = match[1];

  return fetch(`https://gfycat.com/cajax/get/${id}`).then((d) => {
    if (!d.error && d.gfyItem.numFrames === '9') return null;
    return d.error ? null : d.gfyItem.webmUrl;
  });
};

const getImgurUrl = (url) => {
  let match = url.match(/imgur\.com\/+([\w]+)/);
  const id = match[1];

  return fetch(`https://api.imgur.com/3/image/${id}`, {
    cache: false,
    headers: true,
  }).then((d) => {
    return d ? d.data.mp4 : null;
  });
};

const whitelist = ({ url }) => {
  if (url.indexOf('imgur.com/a/') > -1) return false;
  if (url.indexOf('imgur.com/gallery/') > -1) return false;

  return url.indexOf('gfycat') > 1 || url.match(/(webm|mp4|gifv)$/);
};

const sanitize = (item) => {
  let url = item.url;

  url = url.replace('gfycat.com/gifs/detail', 'gfycat.com');
  url = url.replace(/[\?#].*$/, '');

  if (url.indexOf('//imgur.com') > -1) {
    url = url.replace('//imgur.com', '//i.imgur.com');
  }

  if (url.indexOf('imgur') > -1) {
    const match = url.match(/\.(\w*)$/);
    if (!match) url += '.jpg';
  }

  return {
    ...item,
    url,
  };
};

const parseItem = (item) => {
  return new Promise((resolve) => {
    if (item.url.match(/gfycat/)) {
      getGfyUrl(item.url).then((result) => {
        resolve({
          ...item,
          url: result,
        });
      });
    } else if (item.url.match(/imgur/)) {
      getImgurUrl(item.url).then((result) => {
        resolve({
          ...item,
          url: result,
        });
      });
    } else {
      resolve(item);
    }
  });
};

class Stream {
  constructor() {
    this.after = null;
    this.subs = [];
  }

  setSubs(subs) {
    this.subs = subs;
    this.after = null;
  }

  fetchMore() {
    const sub = this.subs.join('+');
    const url = `https://www.reddit.com/r/${sub}.json?after=${this.after}`;

    return fetch(url).then(({ data }) => {
      this.after = data.after;
      return data.children;
    })
    .then(items => items.map(item => item.data))
    .then(items => items.filter(whitelist))
    .then(items => items.map(sanitize))
    .then(items => Promise.all(items.map(parseItem)))
    .then(items => items.filter(i => i.url));
  };
}

export default Stream;
