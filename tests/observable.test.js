import { observable } from "../src"

let store = null

beforeAll(() => {
  store = observable({ key: "initial value" })
})

beforeEach(() => {
  store.reset()
})

it("creates a store", () => {
  expect(store.key).toEqual("initial value")
  expect(store.getState()).toEqual({ key: "initial value" })
})

it("sets a value", () => {
  store.set({ key: 123 })
  expect(store.key).toEqual(123)
})

it("calls the callback on update", () => {
  const callback = jest.fn()
  const unsubscribe = store.subscribe(callback)
  store.set({ key: "observed value" })
  expect(store.key).toEqual("observed value")
  expect(callback).toBeCalledWith({ key: "observed value" })
  unsubscribe()
})
