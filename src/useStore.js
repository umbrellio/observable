import { useState, useEffect } from "react"

// eslint-disable-next-line no-unused-vars
import { StoreReactHook } from "./types"

/**
 * @template T
 * @type {StoreReactHook<T>}
 */
const useStore = (store, { map } = {}) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => store.subscribe(data => setState(data)), [])

  return map ? map(state) : state
}

export default useStore
