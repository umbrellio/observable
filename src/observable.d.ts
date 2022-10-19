import { Store } from "./common"

declare function observable<T> (initialData: T): Store<T>

export default observable
