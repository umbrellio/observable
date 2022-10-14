import { Component } from "react"

import { Store, ReactComponent, MapFn } from "./common"

declare interface StoreConfig<T> {
  store: Store<T>
  key: string
  map?: MapFn<T>
}

declare type Wrapper<Props, State, SnapShot> = (
  (component: ReactComponent<Props, State, SnapShot>) => Component<Props, State, SnapShot>
)

declare function multipleObserver<State, ComponentState, ComponentSnapShot>
  (stores: [StoreConfig<State>]): Wrapper<State, ComponentState, ComponentSnapShot>

declare function multipleObserver<T1, T2, S, SS>
  (stores: [StoreConfig<T1>, StoreConfig<T2>]): Wrapper<T1 & T2, S, SS>

declare function multipleObserver<T1, T2, T3, S, SS>
  (stores: [StoreConfig<T1>, StoreConfig<T2>, StoreConfig<T3>]): Wrapper<T1 & T2 & T3, S, SS>

declare function multipleObserver<T1, T2, T3, T4, S, SS>
  (stores: [StoreConfig<T1>, StoreConfig<T2>, StoreConfig<T3>, StoreConfig<T4>]): Wrapper<T1 & T2 & T3 & T4, S, SS>

declare function multipleObserver<T1, T2, T3, T4, T5, S, SS>
  (stores: [StoreConfig<T1>, StoreConfig<T2>, StoreConfig<T3>, StoreConfig<T4>, StoreConfig<T5>]): Wrapper<T1 & T2 & T3 & T4 & T5, S, SS>

declare function multipleObserver<T1, T2, T3, T4, T5, T6, S, SS>
  (stores: [StoreConfig<T1>, StoreConfig<T2>, StoreConfig<T3>, StoreConfig<T4>, StoreConfig<T5>, StoreConfig<T6>]): Wrapper<T1 & T2 & T3 & T4 & T5 & T6, S, SS>

declare function multipleObserver<T1, T2, T3, T4, T5, T6, T7, S, SS>
  (stores: [StoreConfig<T1>, StoreConfig<T2>, StoreConfig<T3>, StoreConfig<T4>, StoreConfig<T5>, StoreConfig<T6>, StoreConfig<T7>]): Wrapper<T1 & T2 & T3 & T4 & T5 & T6 & T7, S, SS>

export default multipleObserver
