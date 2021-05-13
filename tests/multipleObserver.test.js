import React from "react"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Enzyme from "enzyme"

import { observable, multipleObserver } from "../src"

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

it("wraps a component with the multiple observable", () => {
  const observer = multipleObserver([
    { store, key: "value" },
    { store: anotherStore, key: "anotherValue" },
  ])
  const component = shallowComponent(observer)
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
  const component = shallowComponent(observer)
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
