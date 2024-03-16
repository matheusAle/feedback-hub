export interface Observable<T> {
  subscribe: (listener: (value: T) => void) => () => void;
  next: (value: T) => void;
}

export const createObservable = <T>() => {
  const listeners = new Set<(value: T) => void>();

  const subscribe = (listener: (value: T) => void) => {
    listeners.add(listener);

    return () => {
      listeners.delete(listener);
    };
  };

  const next = (value: T) => {
    for (const listener of listeners) {
      listener(value);
    }
  };

  return {
    subscribe,
    next,
  };
};
