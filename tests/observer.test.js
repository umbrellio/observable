import React from "react"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Enzyme from "enzyme"

import { observable } from "../src"

const TestComponent = props => {
  return <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(props) }} />
}

const shallowComponent = observer => {
  const ObservedComponent = observer(TestComponent)
  return Enzyme.shallow(<ObservedComponent />)
}

let store = null
let anotherStore = null

beforeAll(() => {
  Enzyme.configure({ adapter: new Adapter() })
  store = observable({ key: "initial value" })
  anotherStore = observable({ anotherKey: "another initial value" })
})

beforeEach(() => {
  store.reset()
  anotherStore.reset()
})

it("wraps a component with the observable", () => {
  const observer = store.observer({ key: "value" })
  const component = shallowComponent(observer)
  expect(component.html()).toEqual("<pre>{\"value\":{\"key\":\"initial value\"}}</pre>")

  store.set({ key: "new value" })
  expect(component.html()).toEqual("<pre>{\"value\":{\"key\":\"new value\"}}</pre>")
  component.unmount()
})

it("wraps a component with the observable (mapped)", () => {
  const observer = store.observer({ key: "value", map: state => state.key })
  const component = shallowComponent(observer)
  expect(component.html()).toEqual("<pre>{\"value\":\"initial value\"}</pre>")

  store.set({ key: "new value" })
  expect(component.html()).toEqual("<pre>{\"value\":\"new value\"}</pre>")
  component.unmount()
})
