import React from "react"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Enzyme from "enzyme"

import { observable } from "../src"

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

it("wraps a component with the observable", () => {
  const observer = store.observer({ key: "value" })
  const component = shallowComponent(observer, TestComponent)
  expect(component.html()).toEqual("<pre>{\"value\":{\"key\":\"initial value\"}}</pre>")

  store.set({ key: "new value" })
  expect(component.html()).toEqual("<pre>{\"value\":{\"key\":\"new value\"}}</pre>")
  component.unmount()
})

it("wraps a component with the observable (mapped)", () => {
  const observer = store.observer({ key: "value", map: state => state.key })
  const component = shallowComponent(observer, TestComponent)
  expect(component.html()).toEqual("<pre>{\"value\":\"initial value\"}</pre>")

  store.set({ key: "new value" })
  expect(component.html()).toEqual("<pre>{\"value\":\"new value\"}</pre>")
  component.unmount()
})

it("wraps a class component with the observable", () => {
  const observer = countStore.observer({ key: "count" })
  const component = shallowComponent(observer, ClassTestComponent)
  expect(component.html())
    .toEqual("<div><button>+</button><span>Count: 0</span><span>Max: 10</span></div>")

  countStore.set({ max: 20 })
  expect(component.html())
    .toEqual("<div><button>+</button><span>Count: 0</span><span>Max: 20</span></div>")
  component.unmount()
})
