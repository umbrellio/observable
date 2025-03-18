import { useState, useEffect } from "react"

const useStore = (store, { map } = {}) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => {
    const unsubscribe = store.subscribe(setState)
    setState(store.getState())
    return unsubscribe
  }, [])

  return map ? map(state) : state
}

export default useStore
