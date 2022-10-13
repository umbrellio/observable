import { Store, MapFn } from "./common"

declare interface Options<T> {
  map: MapFn<T>
}

declare function useStore<T> (store: Store<T>, options?: Options<T>): T

export default useStore
