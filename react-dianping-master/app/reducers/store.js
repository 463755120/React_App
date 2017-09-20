import * as actionTypes from '../constants/store'
//制定规则 Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State
const initialState = []
export default function storeinfo(state = initialState, action) {
    switch (action.type) {
        case actionTypes.STORE_UPDATE:
            return action.data
        case actionTypes.STORE_ADD:
            state.unshift(action.data)
            return state
        case actionTypes.STORE_RM:
            return state.filter(item => {
                if (item.id !== action.data.id) {
                    return item
                }
            })
        default:
            return state
    }
}