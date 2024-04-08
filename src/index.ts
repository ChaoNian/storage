//  expire 过期时间key   permanent 永久不过期
import { StorageCls,Key,expire, Data } from "./type/index";
import { Dicionaries } from "./enum/index";
/**
 * implements 关键字在 TypeScript 中用于实现接口。
 * 当创建类时，可以通过 implements 关键字来表示类要遵循某个或某些接口的约定。这有助于保持代码的结构和明确类的职责。
 */
export class Storage implements StorageCls {
    get<T =any>(key:Key) {
        // 读数据
        const value = localStorage.getItem(key)
        if (value) {
            const obj:Data<T> = JSON.parse(value)
            const now = new Date().getTime()
            // 有效并且是数组类型 并且过期了 进行删除和提示
            if(typeof obj[Dicionaries.expires] == 'number' && obj[Dicionaries.expires] < now) {
                this.remove(key)
                return {
                    message:`${key}已过期`,
                    value: null
                }
            } else {
                // 否则成功
                return {
                    message: '成功读取',
                    value: obj.value
                }
            }

        } else {
            // 无数据
            return {
                message:`key 值无效`,
                value: null
            }
        }
    }
    
    // 存储接受 key value 和过期时间 默认永久
    set<T = any>(key:Key, value: T, expire:Dicionaries.expires) {
        // 格式化数据
        const data = {
            value,
            [Dicionaries.expires]:expire
        }
        // 存进去
        localStorage.setItem(key, JSON.stringify(data))
    }

    remove(key:Key) {
        localStorage.removeItem(key)
    }

    clear() {
        localStorage.clear()
    }
}


// // 定义一个接口
// interface Animal {
//     name: string;
//     makeSound(): void;
// }
 
// // 实现这个接口的类
// class Dog implements Animal {
//     name: string;
 
//     constructor(name: string) {
//         this.name = name;
//     }
 
//     makeSound(): void {
//         console.log(`${this.name} barks.`);
//     }
// }
 
// // 使用
// const myDog = new Dog('Rex');
// myDog.makeSound(); // 输出: Rex barks.