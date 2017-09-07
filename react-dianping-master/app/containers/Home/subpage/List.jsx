import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getListData } from '../../../fetch/home/home'

import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import './style.less'

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],
            hasMore:false,
            isLoadingMore:false,
            page:0
        }
    }
   render(){
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length    
                    ?<ListCompoent data={this.state.data}/>
                    :<div>{/* 加载中... */}</div>  
                }
                {
                    this.state.hasMore
                    ?<LoadMore isLoadingMore = {this.state.isLoadingMore} loadMoreFn = {this.loadMoreData.bind(this)}/>
                    :''
                }
            </div>
        )
   }
   componentDidMount(){
       //获取首屏数据
       this.loadFirstPageData()
   }

   loadFirstPageData (){
       const cityName = this.props.cityName
       const result = getListData(cityName,0)
       this.resultHandle(result)
   }
   //加载更多
   loadMoreData (){
       this.setState({
            isLoadingMore:true
       })
       const cityName = this.props.cityName
       const page = this.state.page
       const result = getListData(cityName,page)
       this.resultHandle(result)

       this.setState({
            page:page+1,
            isLoadingMore:false
       })

   }

   resultHandle (result) {
       result.then(res=>{
          return res.json()
       }).then(json=>{
          const hasMore = json.hasMore
          const data = json.data
          this.setState({
              hasMore:hasMore,
              //数据是累加的
              data:this.state.data.concat(data)
          })
       })
   }
}

export default List