/**
 * @template T
 * @typedef {object} Store
 * @property {function(): T} getState
 * @property {function(Partial<T>): void} set
 * @property {function(ObserverOptions<T>): Observer<T>} observer
 * @property {function(SubscribeFn<T>): UnsubscribeFn} subscribe
 * @property {function(): void} reset
 */

/**
 * @template T
 * @typedef StoreConfig
 * @property {Store<T>} store
 * @property {string} key
 */

/**
 * @template T
 * @typedef {object} ObserverOptions
 * @property {string} key
 * @property {MapFn<T>} map
 */

/**
 * @template T
 * @callback ComponentWrapper
 * @param {React.Component<T> | React.PureComponent<T> | React.FC<T>} component
 * @returns {React.Component<T>}
 */

/**
 * @template T
 * @typedef {object} StoreReactHookOptions
 * @property {MapFn<T>} map
 */

/**
 * @callback UnsubscribeFn
 * @returns {void}
 */

/**
 * @template T
 * @callback SubscribeFn
 * @param {T}
 * @returns {void}
 */

/**
 * @template T
 * @callback MapFn<T>
 * @param {T}
 * @returns {any}
 */

export {}
