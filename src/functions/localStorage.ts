import dayjs from './localeDayjs.ts';

type StoreTypeMap = {
    string: string;
    boolean: boolean;
    number: number;
    object: object | null;
};

/**
 *
 * @param {*} type string | boolean | number | object
 * @param {*} key key string in which to store in localStorage
 * @param {*} value object to store
 */
export const setStoreValue = <K extends keyof StoreTypeMap>(type: K, key: string, value: StoreTypeMap[K]) => {
    if (type !== typeof value) {
        throw new TypeError(`value type does not match expected type ${type}/${typeof value}`);
    }

    localStorage.setItem(key, JSON.stringify({ type, value }));
};

// eslint-disable-next-line
const reviver = (_key: string, value: any) => {
    // eslint-disable-next-line
    if (value && value.__type === 'dayjs') {
        // eslint-disable-next-line
        return dayjs(value.value);
    }
    // eslint-disable-next-line
    return value;
};

/**
 *
 * @param key
 * @returns
 */
export const getStoreValue = <T>(key: string, defaultValue: T): T => {
    const value = localStorage.getItem(key);
    if (value === null) return defaultValue;

    // eslint-disable-next-line
    const data = JSON.parse(value, reviver);
    if (data === null) return defaultValue;

    // eslint-disable-next-line
    if (!data.type || data.value === undefined) throw new Error('unexpected value format');

    // eslint-disable-next-line
    return data.value;
};
