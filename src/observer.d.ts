import { ComponentWrapper, ObserverOptions, Store } from "./common"

declare function observer<T, S, SS> (store: Store<T>, options?: ObserverOptions<T>): ComponentWrapper<T, S, SS>

export default observer
