import { useSyncExternalStore } from "react";
import { useIsomorphicLayoutEffect } from "./use-isomorphic-layout-effect";
import { isClient } from "../lib/is-client";

/* The use storage initial value type */
export type UseStorageInitialValue<Value> = Value | (() => Value);

/* The use storage options type */
export interface UseStorageOptions<Value> {
  /* The serializer function to be invoked */
  serializer?: (value: Value) => string;
  /* The deserializer function to be invoked */
  deserializer?: (value: string) => Value;
  /* The storage to be used */
  storage?: Storage;
  /* The initial value of the storage */
  initialValue?: UseStorageInitialValue<Value>;
}

/* The use storage return type */
export interface UseStorageReturn<Value> {
  /* The value of the storage */
  value: Value;
  /* The loading state of the storage */
  set: (value: Value) => void;
  /* The error state of the storage */
  remove: () => void;
}

export const dispatchStorageEvent = (params: Partial<StorageEvent>) =>
  window.dispatchEvent(new StorageEvent("storage", params));

const setStorageItem = (storage: Storage, key: string, value: string) => {
  const oldValue = storage.getItem(key);

  storage.setItem(key, value);
  dispatchStorageEvent({
    key,
    oldValue,
    newValue: value,
    storageArea: storage,
  });
};

const removeStorageItem = (storage: Storage, key: string) => {
  const oldValue = storage.getItem(key);

  storage.removeItem(key);
  dispatchStorageEvent({ key, oldValue, newValue: null, storageArea: storage });
};

const getStorageItem = (storage: Storage, key: string) => {
  const value = storage.getItem(key);
  if (!value) return undefined;
  return value;
};

const storageSubscribe = (callback: () => void) => {
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getServerSnapshot = () => undefined;

const mockStorage = {
  getItem: (key: string) => null,
  removeItem: (key: string) => {},
  setItem: (key: string, value: string) => {},
} as Storage;

/**
 * @name useStorage
 * @description - Hook that manages storage value
 * @category Utilities
 *
 * @param {string} key The key of the storage
 * @param {(value: Value) => string} [params.serializer] The serializer function
 * @param {(value: string) => Value} [params.deserializer] The deserializer function
 * @param {Storage} [params.storage] The storage
 * @param {UseStorageInitialValue<Value>} [params.initialValue] The initial value of the storage
 * @returns {UseStorageReturn<Value>} The value and the set function
 *
 * @example
 * const { value, set, remove } = useStorage('key', 'value');
 */
export const useStorage = <Value>(
  key: string,
  params?: UseStorageInitialValue<Value> | UseStorageOptions<Value>
) => {
  const options = (
    typeof params === "object" ? params : undefined
  ) as UseStorageOptions<Value>;
  const initialValue = (
    options ? options?.initialValue : params
  ) as UseStorageInitialValue<Value>;

  const set = (value: Value) => {
    if (value === null) return removeStorageItem(storage, key);
    setStorageItem(storage, key, serializer(value));
  };
  const remove = () => removeStorageItem(storage, key);

  const storage =
    options?.storage ?? (isClient ? window?.localStorage : mockStorage);
  const serializer = (value: Value) => {
    if (options?.serializer) return options.serializer(value);
    return JSON.stringify(value);
  };

  const deserializer = (value: string) => {
    if (options?.deserializer) return options.deserializer(value);

    if (value === "undefined") {
      return undefined as unknown as Value;
    }

    try {
      return JSON.parse(value) as Value;
    } catch {
      return value as Value;
    }
  };

  const getSnapshot = () => getStorageItem(storage, key);
  const store = useSyncExternalStore(
    storageSubscribe,
    getSnapshot,
    getServerSnapshot
  );

  useIsomorphicLayoutEffect(() => {
    const value = getStorageItem(storage, key);
    if (value === undefined && initialValue !== undefined) {
      setStorageItem(
        storage,
        key,
        serializer(
          initialValue instanceof Function ? initialValue() : initialValue
        )
      );
    }
  }, [key]);

  return {
    value: store ? deserializer(store) : undefined,
    set,
    remove,
  };
};
