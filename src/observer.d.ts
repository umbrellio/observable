import { ComponentWrapper, ObserverOptions, Store } from "./common"

declare function observer<State, ComponentState, ComponentSnapShot>
  (store: Store<State>, options?: ObserverOptions<State>):
    ComponentWrapper<State, ComponentState, ComponentSnapShot>

export default observer
