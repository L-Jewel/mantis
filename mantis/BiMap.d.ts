export declare class BiMap<K, V> {
    private keyToValue;
    private valueToKey;
    constructor();
    set(key: K, value: V): void;
    getValue(key: K): V | undefined;
    getValues(): V[];
    getKey(value: V): K | undefined;
    getKeys(): K[];
    deleteByKey(key: K): void;
    deleteByValue(value: V): void;
}
//# sourceMappingURL=BiMap.d.ts.map