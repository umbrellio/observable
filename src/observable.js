import observer from "./observer"

// eslint-disable-next-line no-unused-vars
import { Observable } from "./types"

/**
 * @template T
 * @type {Observable<T}
 */
const observable = initial => {
  let store = { ...initial }

  const listeners = new Set()
  const trigger = (...args) => listeners.forEach(x => x(...args))
  const getState = () => store
  const subscribe = callback => {
    listeners.add(callback)
    return () => listeners.delete(callback)
  }

  const setter = values => {
    store = { ...store, ...values }
    trigger(store)
  }

  const reset = () => {
    store = { ...initial }
    trigger(store)
  }

  const obj = {
    set: setter,
    observer: (...args) => observer(obj, ...args),
    getState,
    subscribe,
    reset,
  }

  Object.keys(store).forEach(key => {
    Object.defineProperty(obj, key, {
      enumerable: true,
      get () { return store[key] },
    })
  })

  return obj
}

export default observable
