import React from "react"

const observer = (store, { key, map }) => WrappedComponent => {
  return class extends React.Component {
    static displayName = `${key} State Observer`

    state = { ...store.getState() }

    constructor (props) {
      super(props)
      this.unsubscribe = store.subscribe(data => this.setState(data))
    }

    componentWillUnmount () {
      this.unsubscribe()
    }

    render () {
      const state = { [key]: map ? map(this.state) : this.state }
      return <WrappedComponent {...this.props} {...state} />
    }
  }
}

export default observer
