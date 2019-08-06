/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {

    // 没有中间件
  if (funcs.length === 0) {
    return arg => arg
  }
  // 只有一个时，只有调用一次即可
  if (funcs.length === 1) {
    return funcs[0]
  }
    /*
        [a,b,c,d,...].reduce((a,b)=>{
            return (...args) => {
                // a 是上一次的返回值，b 为下一个执行的函数
                return a(b(...args))
            }
        })
        ↓↓↓↓ reduce 执行的 return a(b(...args))
        //  action => {
            //...
        //   }
    */
     return funcs.reduce((a,b) => {
        // a 是上一次的返回值，b 为下一个执行的函数
        return (...args) => {
            // a(b(...args)) -> dispatch(...)
            return a(b(...args))
        }
    }) 
//   return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
