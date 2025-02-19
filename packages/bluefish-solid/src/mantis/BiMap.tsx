export class BiMap<K, V> {
  private keyToValue: Map<K, V>;
  private valueToKey: Map<V, K>;

  constructor() {
    this.keyToValue = new Map<K, V>();
    this.valueToKey = new Map<V, K>();
  }

  set(key: K, value: V): void {
    if (this.keyToValue.has(key)) {
      const oldValue = this.keyToValue.get(key);
      if (oldValue !== undefined) {
        this.valueToKey.delete(oldValue);
      }
    }
    if (this.valueToKey.has(value)) {
      const oldKey = this.valueToKey.get(value);
      if (oldKey !== undefined) {
        this.keyToValue.delete(oldKey);
      }
    }
    this.keyToValue.set(key, value);
    this.valueToKey.set(value, key);
  }

  getValue(key: K): V | undefined {
    return this.keyToValue.get(key);
  }

  getValues(): V[] {
    return Array.from(this.keyToValue.values());
  }

  getKey(value: V): K | undefined {
    return this.valueToKey.get(value);
  }

  getKeys(): K[] {
    return Array.from(this.keyToValue.keys());
  }

  deleteByKey(key: K): void {
    const value = this.keyToValue.get(key);
    if (value !== undefined) {
      this.keyToValue.delete(key);
      this.valueToKey.delete(value);
    }
  }

  deleteByValue(value: V): void {
    const key = this.valueToKey.get(value);
    if (key !== undefined) {
      this.valueToKey.delete(value);
      this.keyToValue.delete(key);
    }
  }
}
