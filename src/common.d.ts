import { Component, PureComponent, FC } from "react"

export declare type SubscribeFn<T> = (data: T) => void

export declare type UnsubscribeFn = () => void

export declare type MapFn<T> = (data: T) => T | any

export declare type GenericReactComponent<T, S, SS> = (
  Component<T, S, SS> | PureComponent<T, S, SS> | FC<T>
)

export declare type ComponentWrapper<T, S, SS> = (
  (component: GenericReactComponent<T, S, SS>) => Component<T>
)

export declare interface Store<T> {
  getState(): T
  set(data: Partial<T>): void
  observer<S, SS>(options: ObserverOptions<T>): Observer<T, S, SS>
  subscribe(sub: SubscribeFn<T>): UnsubscribeFn
  reset(): void
}

export declare interface ObserverOptions<T> {
  key: string
  map: MapFn<T>
}

export declare interface Observer<T, S, SS> {
  (store: Store<T>, options?: ObserverOptions<T>): ComponentWrapper<T, S, SS>
}
