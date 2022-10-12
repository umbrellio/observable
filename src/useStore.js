import { useState, useEffect } from "react"

// eslint-disable-next-line no-unused-vars
import { Store, StoreReactHookOptions } from "./types"

/**
 * @template T
 * @param {Store<T>} store
 * @param {StoreReactHookOptions<T>} options
 * @returns {T | any}
 */
const useStore = (store, { map } = {}) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => store.subscribe(data => setState(data)), [])

  return map ? map(state) : state
}

export default useStore
