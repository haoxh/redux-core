import createStore from './createStore'
import combineReducers from './combineReducers'
import bindActionCreators from './bindActionCreators'
import applyMiddleware from './applyMiddleware'
import compose from './compose'
import warning from './utils/warning'
import __DO_NOT_USE__ActionTypes from './utils/actionTypes'

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */
// 利用 function name 来判断代码是否被混淆或压缩
function isCrushed() {}

if (
  process.env.NODE_ENV !== 'production' &&
  typeof isCrushed.name === 'string' &&
  isCrushed.name !== 'isCrushed'
) {
  warning(
    'You are currently using minified code outside of NODE_ENV === "production". ' +
      'This means that you are running a slower development build of Redux. ' +
      'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' +
      'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' +
      'to ensure you have the correct code for your production build.'
  )
}

export {
  /** 
   返回一个对象
   store ={
    dispatch,
    subscribe,
    getState,
    replaceReducer,
    [$$observable]: observable
   }
  */
  createStore,
  // 可多个 reducer 注册
  combineReducers,
  /** 
   * 若想子组件不想使用 react-redux 的 connect 函数绑定 store
   * 但是想改变 store 的 state 变化时使用 bindActionCreators
   * const actionCreator =  bindActionCreators(TodoActionCreators, dispatch)
   * TodoActionCreators 多个 actionFuncName = (data) => {type:'XXX',data}
   * dispatch 为 store 的  dispatch
   返回：
   actionCreator = {
       // 将这个对象放入放入子组件的中，触发它将会 dispatch
       // 此时就不需要 connect 注册子组件绑定 store
        actionFuncName:function() {
            return dispatch(actionFuncName.apply(this, arguments))
        },
        ...
   }
  */
  bindActionCreators,
  // 中间件注册
  applyMiddleware,
  // applyMiddleware (中间件功能在这里实现)
  compose,
    /**
    const ActionTypes = {
        INIT: `@@redux/INIT${randomString()}`,
        REPLACE: `@@redux/REPLACE${randomString()}`,
        PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
    }
    // 用来初始化 Reducers
    __DO_NOT_USE__ActionTypes = ActionTypes
    */
  __DO_NOT_USE__ActionTypes
}
