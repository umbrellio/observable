import { useState, useEffect } from "react"
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
