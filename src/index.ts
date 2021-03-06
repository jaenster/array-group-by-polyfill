interface Array<T> {
    groupBy<K extends (string | symbol)>(
        callback: (value: T, index: number, array: T[]) => K,
        thisArg?: any
    ): { [P in K]: T[] }

    groupByToMap<K>(
        callback: (value: T, index: number, array: T[]) => K,
        thisArg?: any
    ): Map<K, T[]>
}


Array.prototype.groupBy ??= function <T, K extends (string | symbol)>(
    callback: (value: T, index: number, array: Array<T>) => K,
    thisArg?: any
): { [P in K]: T[] } {
    const obj: { [P in K]: T[] } = {} as any;
    this.forEach((value, idx, self) => {
        // Always using apply will break #private values
        const ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);

        (obj[ret] ??= []).push(value);
    });

    return obj;
}

Array.prototype.groupByToMap ??= function<T, K>(
    callback: (value: T, index: number, array: Array<T>) => K,
    thisArg?: any
): Map<K, Array<T>> {
    const map = new Map<K, Array<T>>();
    this.forEach((value, idx, self) => {
        // Always using apply will break #private values
        const ret = thisArg ? callback.call(thisArg, value, idx, self) : callback(value, idx, self);

        // Upsert
        const group = map.get(ret) || [];
        if (group.push(value) === 1) map.set(ret, group);

    });
    return map;
}