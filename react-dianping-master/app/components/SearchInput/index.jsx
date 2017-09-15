import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            value:''
        }
    }
    render() {
        return (
            <input 
                className="search-input"
                type="text"
                placeholder="请输入关键字"
                value ={this.state.value}
                onChange = {this.changeHandle.bind(this)}
                onKeyUp={this.KeyUpHandle.bind(this)}
            />
        )
    }

    componentDidMout (){
        this.setState({
            value:this.props.value || ''
        })
    }
    changeHandle (e){
        this.setState({
            value:e.target.value
        })
    }
    KeyUpHandle (e) {
        if (e.keyCode !== 13) {
            return
        }
        this.props.enterHandle(e.target.value)
    }
}

export default SearchInput