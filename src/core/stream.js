import { fetch } from 'core/api';

const getGfyUrl = (url) => {
  let match = url.match(/gfycat\.com\/+([\w]+)/);
  const id = match[1];

  return fetch(`https://gfycat.com/cajax/get/${id}`).then((d) => {
    if (!d.error && d.gfyItem.numFrames === '9') return null;
    return d.error ? null : d.gfyItem.webmUrl;
  });
};

const whitelist = (url) => {
  if (url.indexOf('imgur.com/a/') > -1) return false;
  if (url.indexOf('imgur.com/gallery/') > -1) return false;
  return (url.indexOf('imgur.com') > -1 || url.indexOf('gfycat') > 1);
};

const sanitize = (url) => {
  url = url.replace('gfycat.com/gifs/detail', 'gfycat.com');
  url = url.replace(/[\?#].*$/, '');

  if (url.indexOf('//imgur.com') > -1) {
    url = url.replace('//imgur.com', '//i.imgur.com');
  }

  if (url.indexOf('imgur') > -1) {
    const match = url.match(/\.(\w*)$/);
    if (!match) url += '.jpg';
  }

  url = url.replace('.gifv', '.mp4');

  return url;
};

const validate = (url) => {
  return url.match(/(webm|mp4)$/);
  return url;
};

const parseItem = (url) => {
  return new Promise((resolve) => {
    let result = url;

    if (url.match(/gfycat/)) {
      result = getGfyUrl(url);
    }

    resolve(result);
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
    // const url = `https://www.reddit.com/r/${sub}/top.json?sort=top&t=month&after=${this.after}`;
    const url = `https://www.reddit.com/r/${sub}.json?after=${this.after}`;

    return fetch(url, this.after !== null).then(({ data }) => {
      this.after = data.after;
      return data.children;
    })
    .then(items => items.map(item => item.data.url))
    .then(items => items.filter(whitelist))
    .then(items => items.map(sanitize))
    .then(items => Promise.all(items.map(parseItem)))
    .then(items => items.filter(validate))
    .then(items => items);
  };
}

export default Stream;
