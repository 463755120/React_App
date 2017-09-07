import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
              {
                  this.props.isLoadingMore
                  ?<span>加载中...</span>
                  :<span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
              }
            </div>
        )
    }
    loadMoreHandle(){
        //点击加载更多
       this.props.loadMoreFn()
    }

    componentDidMount (){
        //上滑加载
        const wrapper = this.refs.wrapper
        let timeoutId
        const callback = ()=>{
           const top = wrapper.getBoundingClientRect().top
           const windowHeight = window.screen.height
           if(top && top<windowHeight ){
               // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
               this.props.loadMoreFn()
           }
        }

        window.addEventListener("scroll",function(){
           if (this.props.isLoadingMore){
                return
           }
           if(timeoutId){
            clearTimeout(timeoutId)
           }
           timeoutId = setTimeout(callback,500)

        }.bind(this), false);
    }
  
}

export default LoadMore