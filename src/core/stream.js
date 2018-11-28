import { fetch } from './api';

const getGfyUrl = (url) => {
  let match = url.match(/gfycat\.com\/+([\w]+)/);
  const id = match[1];

  return fetch(`https://api.gfycat.com/v1/gfycats/${id}`, {
    cache: true,
  }).then((d) => {
    if (d === null) {
      return null;
    }

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
  // eslint-disable-next-line
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
  constructor(href) {
    const url = new URL(href);
    url.hostname = 'www.reddit.com';
    url.host = 'www.reddit.com';
    url.port = 80;
    url.protocol = 'https:';
    url.pathname = url.pathname.replace(/\/?$/, '.json');

    this.url = url;
    this.after = null;
  }

  fetchMore() {
    if (this.after) {
      this.url.searchParams.set('after', this.after);
    }

    const url = this.url.toString();

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
