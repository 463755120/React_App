import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import BuyAndStore from '../../../components/BuyAndStore'
import { hashHistory } from 'react-router'

import * as storeActionsFromFile from '../../../actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            isStore:false
        }
    }
    render() {
        return (
            <div>
                <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }
    componentDidMount (){
       this.checkStoreState()
    }
    //验证当前商户是否被收藏
    checkStoreState (){
        const id = this.props.id
        const store = this.props.store

        //some满足数组内任何一个即可
        store.some(item=>{
            if(item.id === id){
                this.setState({
                    isStore :true
                })
                return true
            }
        })
    }
    //验证登录
    loginCheck (){
        const id = this.props.id
        const userinfo = this.props.userinfo
        if(!userinfo.username) {
            //未登录
            hashHistory.push('/Login/'+encodeURIComponent('/detail/')+id)
            return false
        } else {
            return true
        }
    }
    // 购买事件
    buyHandle() {
        // 验证登录，未登录则retur
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        // 此过程为模拟购买，因此可省去复杂的购买过程

        // 跳转到用户主页
        hashHistory.push('/User')
    }
    //收藏事件
    storeHandle() {
        //验证登录，未登录返回登录
        const loginFlag = this.loginCheck()
        if(!loginFlag){
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions

        if(this.state.isStore) {
            //已经被收藏,这是要取消收藏
            storeActions.rm({id:id})
        } else {
            //增加收藏列表
            storeActions.add({id:id})
        }

        this.setState({
            isStore : !this.state.isStore
        })

    }

}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo,
        store:state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
        storeActions: bindActionCreators(storeActionsFromFile, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)