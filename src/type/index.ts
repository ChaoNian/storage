import { Dicionaries } from "../enum/index"

export type Key = string

export type expire = Dicionaries.expires

export interface Data<T> {
    value: T
    [Dicionaries.expires]: Dicionaries.expires | number
} 
interface Result<T> { // 返回值类型
        message:string,
        value: T | null

}
// 定义的类型
export interface StorageCls {
    get:<T>(key:Key) =>Result<T | null>
    set:<T>(key:Key, value:T, expire:expire) => void
    remove:(key:Key) => void
    clear: () => void
}