import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
/**
 *  一个打印日志的 中间件 （形成柯里化函数）
 *  使用中间件时会 替换 dispatch 方法，真正的 dispatch 为此时的 next 参数
    // store
     function logger(store) {
         // dispatch
        return function wrapDispatchToAddLogging(next) {
            // action
            return function dispatchAndLog(action) {
            console.log('dispatching', action)
            
            let result = next(action)
            console.log('next state', store.getState())
            return result
            }
        }
    }
 */


/**
 * 
 * @param  {...any} middlewares  rest 参数  middlewares => Array
 */
export default function applyMiddleware(...middlewares) {

    //createStore -> enhancer(createStore)(reducer, preloadedState)

  return createStore => (...args) => {
    // args =  [reducer, preloadedState]
    const store = createStore(...args)
    
    let dispatch = () => {
      throw new Error(
        `Dispatching while constructing your middleware is not allowed. ` +
          `Other middleware would not be applied to this dispatch.`
      )
    }

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (...args) => dispatch(...args)
    }
    // 例： logger(store={getState,dispatch})
    //  store =>{
    //     next => {
    //         action => {
    //             console.group(action.type)
    //             console.info('dispatching', action)
    //             let result = next(action)
    //             console.log('next state', store.getState())
    //             console.groupEnd(action.type)
    //             return result
    //           }
    //     }
    //  }
    // dispatch({type:'',data:{}})
    const chain = middlewares.map(middleware => middleware(middlewareAPI))
    // 注入正确的 dispatch，并替换 dispatch
    dispatch = compose(...chain)(store.dispatch)

    return {
      ...store,
      dispatch
    }
  }
}
