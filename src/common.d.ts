import { Component, PureComponent, FC } from "react"

export declare type SubscribeFn<T> = (data: T) => void

export declare type UnsubscribeFn = () => void

export declare type MapFn<T> = (data: T) => T | any

export declare type ReactComponent<Props, State, SnapShot> = (
  Component<Props, State, SnapShot> | PureComponent<Props, State, SnapShot> | FC<Props>
)

export declare type ComponentWrapper<Props, State, SnapShot> = (
  (component: ReactComponent<Props, State, SnapShot>) => Component<Props, State, SnapShot>
)

export declare interface Store<State> {
  getState(): State
  set(data: Partial<State>): void
  observer<ComponentState, ComponentSnapShot>
    (options: ObserverOptions<State>): Observer<State, ComponentState, ComponentSnapShot>
  subscribe(sub: SubscribeFn<State>): UnsubscribeFn
  reset(): void
}

export declare interface ObserverOptions<T> {
  key: string
  map: MapFn<T>
}

export declare interface Observer<State, ComponentState, ComponentSnapShot> {
  (store: Store<State>, options?: ObserverOptions<State>):
    ComponentWrapper<State, ComponentState, ComponentSnapShot>
}
