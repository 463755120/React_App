import * as actionTypes from '../constants/userinfo'

const initialState = {}
    //Reducer 是一个函数，它接受 Action 和当前 State 作为参数，返回一个新的 State

export default function userinfo(state = initialState, action) {
    switch (action.type) {
        case actionTypes.USERINFO_UPDATE:
            return action.data
        default:
            return state
    }
}