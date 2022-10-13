import { Component } from "react"

import { Store, GenericReactComponent } from "./common"

declare interface StoreConfig<T> {
  store: Store<T>
  key: string
}

declare type Wrapper<T, S, SS> = (
  (component: GenericReactComponent<T, S, SS>) => Component<T, S, SS>
)

declare function multipleObserver<T, S, SS> (stores: [StoreConfig<T>]): Wrapper<T, S, SS>

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
