import React from "react"
import Adapter from "@cfaester/enzyme-adapter-react-18"
import Enzyme from "enzyme"

import { observable, multipleObserver } from "../src"

const TestComponent = props => {
  return <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }} />
}

class ClassTestComponent extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      count: 0,
    }
  }

  handleClick = () => {
    this.setState(prev => {
      const next = prev === this.props.maxCount ? prev : prev + 1
      return { count: next }
    })
  }

  render () {
    return (
      <div>
        <button onClick={this.handleClick}>+</button>
        <span>{`Count: ${this.state.count}`}</span>
        <span>{`Max: ${this.props.count.max}`}</span>
        <span>{`Value: ${this.props.info.key}`}</span>
      </div>
    )
  }
}

const shallowComponent = (observer, component) => {
  const ObservedComponent = observer(component)
  return Enzyme.shallow(<ObservedComponent />)
}

let store = null
let anotherStore = null
let countStore = null

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  store = observable({ key: "initial value" })
  anotherStore = observable({ anotherKey: "another initial value" })
  countStore = observable({ max: 10 })
})

beforeEach(() => {
  store.reset()
  anotherStore.reset()
  countStore.reset()
})

it("wraps a component with the multiple observable", () => {
  const observer = multipleObserver([
    { store, key: "value" },
    { store: anotherStore, key: "anotherValue" },
  ])
  const component = shallowComponent(observer, TestComponent)
  expect(component.html()).toEqual(
    "<pre>" +
    "{\"value\":{\"key\":\"initial value\"}," +
    "\"anotherValue\":{\"anotherKey\":\"another initial value\"}}" +
    "</pre>",
  )

  store.set({ key: "new value" })
  anotherStore.set({ anotherKey: "another new value" })
  expect(component.html()).toEqual(
    "<pre>" +
    "{\"value\":{\"key\":\"new value\"}," +
    "\"anotherValue\":{\"anotherKey\":\"another new value\"}}" +
    "</pre>",
  )
  component.unmount()
})

it("wraps a component with the multiple observable (mapped)", () => {
  const observer = multipleObserver([
    { store, key: "value", map: state => state.key },
    { store: anotherStore, key: "anotherValue", map: state => state.anotherKey },
  ])
  const component = shallowComponent(observer, TestComponent)
  expect(component.html()).toEqual(
    "<pre>" +
    "{\"value\":\"initial value\"," +
    "\"anotherValue\":\"another initial value\"}" +
    "</pre>",
  )

  store.set({ key: "new value" })
  anotherStore.set({ anotherKey: "another new value" })
  expect(component.html()).toEqual(
    "<pre>" +
    "{\"value\":\"new value\"," +
    "\"anotherValue\":\"another new value\"}" +
    "</pre>",
  )
  component.unmount()
})

it("wraps a class component with the multiple observable", () => {
  const observer = multipleObserver([
    { store, key: "info" },
    { store: countStore, key: "count" },
  ])
  const component = shallowComponent(observer, ClassTestComponent)
  expect(component.html()).toEqual(
    "<div>" +
    "<button>+</button>" +
    "<span>Count: 0</span>" +
    "<span>Max: 10</span>" +
    "<span>Value: initial value</span>" +
    "</div>",
  )

  store.set({ key: "new value" })
  countStore.set({ max: 20 })
  expect(component.html()).toEqual(
    "<div>" +
    "<button>+</button>" +
    "<span>Count: 0</span>" +
    "<span>Max: 20</span>" +
    "<span>Value: new value</span>" +
    "</div>",
  )
  component.unmount()
})
