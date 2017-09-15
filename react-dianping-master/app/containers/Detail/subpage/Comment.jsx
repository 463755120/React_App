import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getCommentData } from '../../../fetch/detail/detai'

import ListComponent from '../../../components/CommentList'
import LoadMore from '../../../components/LoadMore'
import './style.less'

class Comment extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
            data:[],
            page:0,
            hasMore:false,
            isLoadingMore:false
        }
    }

    render() {
        return (
            <div className="detail-comment-subpage">
                <h2>用户点评</h2>
                {
                    this.state.data.length
                    ? <ListComponent data={this.state.data}/>
                    :<div>{/* 加载中... */}</div>
                }
                {
                    this.state.hasMore
                    ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
                    :''
                }
            </div>
        )
    }
    componentDidMount (){
        this.loadFirstPageData()
    }
    loadFirstPageData (){
        const id = this.props.id
        const result = getCommentData(0,id)
        this.resultHandle(result)
    }
    loadMoreData(){
        this.setState({
            isLoadingMore:true
        })
        const id = this.props.id
        const page = this.props.page
        const result = getCommentData(page,id)
        this.resultHandle(result)
        
        // 增加 page 技术
        this.setState({
            isLoadingMore: false
        })
    }

    resultHandle(result){
        result.then(res=>{
            return res.json()
        }).then(json=>{
            const page = this.state.page
            const data = json.data
            const hasMore = json.hasMore
            this.setState({
                page:page+1,
                hasMore:hasMore,
                data:this.state.data.concat(data)
            })
        }).catch(ex => {
            if (__DEV__) {
                console.error('详情页获取用户评论数据出错, ', ex.message)
            }
        })
    }
}

export default Comment