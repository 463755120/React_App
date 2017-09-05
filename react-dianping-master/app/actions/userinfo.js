import * as actionTypes from '../constants/userinfo'

export function update(data) {
    //定义type
    return {
        type: actionTypes.USERINFO_UPDATE,
        data
    }
}