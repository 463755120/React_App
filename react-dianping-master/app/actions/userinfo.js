import * as actionTypes from '../constants/userinfo'

export function update(data) {
    //定义type,view层触发
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}