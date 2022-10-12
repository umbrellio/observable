import React from "react"

// eslint-disable-next-line no-unused-vars
import { Observer } from "./types"

/**
 * @template T
 * @type {Observer<T>}
 */
const observer = (store, { key, map }) => WrappedComponent => {
  return class extends React.Component {
    static displayName = `${key} State Observer`

    state = { ...store.getState() }
    mounted = false

    componentDidMount () {
      this.mounted = true
      this.unsubscribe = store.subscribe(data => {
        this.mounted && this.setState(data)
      })
      this.setState({ ...store.getState() })
    }

    componentWillUnmount () {
      this.unsubscribe && this.unsubscribe()
      this.unsubscribe = null
      this.mounted = false
    }

    render () {
      const state = { [key]: map ? map(this.state) : this.state }
      return <WrappedComponent {...this.props} {...state} />
    }
  }
}

export default observer
