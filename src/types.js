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
 * @callback Observer
 * @param {Store<T>} store 
 * @param {ObserverOptions<T>} options
 * @returns {ComponentWrapper}
 */

/**
 * @template T1, T2, T3, T4, T5
 * @callback MultipleObserver
 * @param {Array<StoreConfig<T1, T2, T3, T4, T5>>} configs
 * @returns {ComponentWrapper}
 */

/**
 * @template T1, T2, T3, T4, T5
 * @typedef StoreConfig
 * @property {Store<T1 | T2 | T3 | T4 | T5>} store
 * @property {string} key
 */

/**
 * @template T
 * @typedef {object} ObserverOptions
 * @property {string} key
 * @property {MapFn<T>} map
 */

/**
 * @callback ComponentWrapper
 * @param {React.Component | React.PureComponent | React.FC} component
 * @returns {React.Component}
 */

/**
 * @template T
 * @callback Observable
 * @param {T} initial
 * @returns {Store<T>}
 */

/**
 * @template T
 * @callback StoreReactHook
 * @param {Store<T>} store
 * @param {StoreReactHookOptions<T>} options
 * @returns {T | any}
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
