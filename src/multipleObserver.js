import React from "react"

const multipleObserver = stores => WrappedComponent => {
  const reduceStates = stores => {
    return stores.reduce((acc, { key, store }) => ({ ...acc, [key]: { ...store.getState() } }), {})
  }

  return class extends React.Component {
    static displayName = `${stores.map(s => s.key).join(" ")} State Observer`

    state = reduceStates(stores)
    mounted = false

    componentDidMount () {
      this.mounted = true
      this.unsubscribes = stores.map(({ key, store }) => store.subscribe(data => {
        this.mounted && this.setState({ [key]: data })
      }))
      this.setState(reduceStates(stores))
    }

    componentWillUnmount () {
      this.unsubscribes.forEach(fn => fn())
      this.unsubscribes = []
      this.mounted = false
    }

    render () {
      const state = stores.reduce((acc, { key, map }) => {
        return {
          ...acc,
          [key]: map ? map(this.state[key]) : this.state[key],
        }
      }, {})

      return <WrappedComponent {...this.props} {...state} />
    }
  }
}

export default multipleObserver
