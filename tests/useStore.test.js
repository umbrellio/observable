import React from "react"
import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import { configure, mount } from "enzyme"
import { act } from "react-dom/test-utils"

import { observable, useStore } from "../src"

const store = observable({ value: 3 })

const TestComponent = () => {
  const data = useStore(store)
  return <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

const TestComponentWithMapping = () => {
  const squareFn = ({ value }) => ({ square: value ** 2 })
  const data = useStore(store, { map: squareFn })
  return <pre dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}

describe("useStore hook", () => {
  beforeAll(() => {
    configure({ adapter: new Adapter() })
  })

  beforeEach(() => {
    act(() => store.reset())
  })

  it("keeps track of given store", () => {
    const component = mount(<TestComponent />)
    expect(component.html()).toEqual("<pre>{\"value\":3}</pre>")

    act(() => store.set({ key: 4 }))

    setTimeout(() => {
      expect(component.html()).toEqual("<pre>{\"value\":4}</pre>")
      component.unmount()
    }, 0)
  })

  it("keeps track of given store and maps it state", () => {
    const component = mount(<TestComponentWithMapping />)
    expect(component.html()).toEqual("<pre>{\"square\":9}</pre>")

    act(() => store.set({ key: 4 }))

    setTimeout(() => {
      expect(component.html()).toEqual("<pre>{\"square\":16}</pre>")
      component.unmount()
    }, 0)
  })
})
