# @umbrellio/observable

[![Coverage Status](https://coveralls.io/repos/github/umbrellio/observable/badge.svg?branch=master)](https://coveralls.io/github/umbrellio/observable?branch=master)
[![Build Status](https://github.com/umbrellio/observable/actions/workflows/ci.yml/badge.svg)](https://github.com/umbrellio/observable)

## Install

```sh
$ yarn add @umbrellio/observable
```

## Usage

The library contains of 4 parts - `observable`, `observer`, `multipleObserver` and `useStore`.

```js
import { observable, observer, multipleObserver, useStore } from "@umbrellio/observable"
```

### Structures

```js
type InitialObject = Object
type State = Object
type Subscription = () => void
type ObserverFunction = Component => Observer<Component>

type ObservableStore = {
  set: (Object) => void, // set stored state (merge)
  observer: (ObserverOptions) => ObserverFunction // see observer
  getState: () => State, // returns current state
  subscribe: (Function) => Subscription, // subscribe on changes
  reset: () => void, // reset store to initial state
  ...InitialObject, // getters for the initial state keys
}

type ObserverOptions = {
  key: String, // property name
  map: (State => Object)? // function for mapping state
}

type MultipleObserverOptionItem = {
  store: ObservableStore, // store object
  key: String, // property name
  map: (State => Object)?, // function for mapping state
}

type UseStoreOptions = {
  map: (State => Object)?, // function for mapping state
}
```

### `observable`

Creates observable store.

```js
observable(initial: InitialObject): ObservableStore
```

```js
import { observable } from "@umbrellio/observable"

const listStore = observable({ list: [] })
```

*IMPORTANT: the store will have keys only from `initial` object*

```js
listStore.set({ otherKey: "value" })
listStore.otherKey // => undefined
listStore.set({ list: [1, 2,3] })
listStore.list // => [1, 2, 3]
```

### `observer`

Subscribes React component on observable store.

```js
observer(store: ObservableStore, options: ObserverOptions): ObserverFunction
```

```js
import { observer } from "@umbrellio/observable"

@observer(listStore, {
  key: "categories",
  map: state => state.list
}) // or @listStore.observer({ key: "categories" })
class List extends React.Component {
  render () {
    const { categories } = this.props

    return <ul>{categories.map(item => <li>{item}</li>)}</ul>
  }
}
```

### `multipleObserver`

Subscribes React component on multiple observable stores.

```js
multipleObserver(stores: MultipleObserverOptionItem[]): ObserverFunction
```

```js
import { multipleObserver } from "@umbrellio/observable"

@multipleObserver([
  { store: listStore, key: "categories", map: state => state.list },
  { store: userStore, key: "user" },
])
class List extends React.Component {
  render () {
    const { categories, user } = this.props

    return (
      <React.Fragment>
        <h2>{user.name}</h2>
        <ul>{categories.map(item => <li>{item}</li>)}</ul>
      </React.Fragment>
    )
  }
}
```

### `useStore`

React hook that keeps track of the observable store.

```js
useStore(store: ObservableStore, options: UseStoreOptions): State
```

```js
import { useStore } from "@umbrellio/observable"

const List = () => {
  const categories = useStore(listStore, { map: state => state.list })

  return <ul>{categories.map(item => <li>{item}</li>)}</ul>
}
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/umbrellio/observable.

## License

Released under MIT License.

## Authors

Created by [Aleksei Bespalov](https://github.com/nulldef),
inspired by idea of [Aleksandr Komarov](https://github.com/akxcv).

<a href="https://github.com/umbrellio/">
<img style="float: left;" src="https://umbrellio.github.io/Umbrellio/supported_by_umbrellio.svg" alt="Supported by Umbrellio" width="439" height="72">
</a>
