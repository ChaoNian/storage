# storage
typescript
## 思考
在我们使用cookie的时候是可以设置有效期的，但是localStorage本身是没有该机制的，只能人为的手动删除，否则会一直存放在浏览器当中，可不可以跟cookie一样设置一个有效期。如果一直存放在浏览器又感觉有点浪费，那我们可以把localStorage进行二次封装实现该方案。


实现思路
在存储的时候设置一个过期时间，并且存储的数据进行格式化方便统一校验，在读取的时候获取当前时间进行判断是否过期，如果过期进行删除即可。
                        
资料 https://blog.csdn.net/qq1195566313/article/details/128691340