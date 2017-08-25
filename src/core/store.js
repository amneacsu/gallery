const defaults = [
  'gifs',
];

class Store {
  get() {
    return JSON.parse(localStorage.getItem('subs')) || defaults;
  }

  set(val) {
    localStorage.setItem('subs', JSON.stringify(val));
  }
}

module.exports = Store;
