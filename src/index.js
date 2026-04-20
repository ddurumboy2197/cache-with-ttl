class Cache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
  }

  get(key) {
    if (!(key in this.cache)) return -1;
    const value = this.cache[key];
    delete this.cache[key];
    this.cache[key] = { value, timestamp: Date.now() };
    return value;
  }

  put(key, value) {
    if (key in this.cache) {
      delete this.cache[key];
    }
    if (Object.keys(this.cache).length >= this.capacity) {
      const oldestKey = Object.keys(this.cache)[0];
      delete this.cache[oldestKey];
    }
    this.cache[key] = { value, timestamp: Date.now() };
  }

  remove(key) {
    if (key in this.cache) {
      delete this.cache[key];
    }
  }

  clean() {
    const now = Date.now();
    for (const key in this.cache) {
      if (this.cache[key].timestamp + 1000 < now) {
        delete this.cache[key];
      }
    }
  }
}

const cache = new Cache(2);
cache.put(1, 1);
cache.put(2, 2);
console.log(cache.get(1)); // 1
cache.put(3, 3); // 2 o'chadi
console.log(cache.get(2)); // -1
cache.clean();
console.log(cache.get(1)); // 1
