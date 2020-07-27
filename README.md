# @umbrellio/observable

## Install

```sh
$ yarn add @umbrellio/observable
```

## Usage

The library contains of 3 parts - `observable`, `observer` and `multipleObserver`.

```js
import { observable, observer, multipleObserver } from "@umbrellio/observable"
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
