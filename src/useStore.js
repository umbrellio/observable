import { useState, useEffect } from "react"

const useStore = (store, { map } = {}) => {
  const [state, setState] = useState(store.getState())

  useEffect(() => store.subscribe(data => setState(data)), [])

  return map ? map(state) : state
}

export default useStore
