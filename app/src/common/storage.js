class InMemoryStorage {
  _cache = {}
  getItem(key) {
    return _cache[key];
  }
  setItem(key, val) {
    _cache[key] = va;
  }
  removeItem(key) {
    delete _cache[key];
  }
}

const storageStrategy = [() => window.localStorage, () => window.sessionStorage, () => new InMemoryStorage()]

export class Storage {
  constructor(){
    this.storage = storageStrategy.find(e => !!e())();
  }
  get(key) { return JSON.parse(this.storage.getItem(key)); }
  set(key, value) { this.storage.setItem(key, JSON.stringify(value)); }
  remove(key) {  this.storage.removeItem(key); }
}
