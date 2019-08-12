import Taro, { Component } from '@tarojs/taro'
import {
  View,
  Text,
  Input,
  Button,
  Swiper,
  SwiperItem
} from '@tarojs/components'
import { AtButton, AtInput, AtList, AtListItem, AtCard } from 'taro-ui'
import { observer, inject } from '@tarojs/mobx'
import './book.styl'
let db = wx.cloud.database()
export default class Book extends Component {
  constructor(props) {
    super(props)
    this.page = 0
    this.state = {
      goods: [],
      tops: []
    }
  }
  onReachBottom() {
    this.page += 1
    this.getList()
  }
  getTops() {
    db.collection('kkb')
      .orderBy('rate', 'desc')
      .limit(2)
      .get({
        success: res => {
          this.setState({
            tops: res.data
          })
        }
      })
  }
  getList() {
    wx.showLoading()
    let init = this.page === 0
    let PAGE = 2
    let item = db.collection('kkb')
    if (!init) {
      item = item.skip(this.page * PAGE)
    }
    item.get({
      success: res => {
        if (init) {
          this.setState({
            goods: res.data
          })
        } else {
          this.setState({
            goods: [...this.state.goods, res.data]
          })
        }
        wx.hideLoading()
      }
    })
  }
  componentDidMount() {
    this.getTops()
    this.getList()
  }
  render() {
    return (
      <View>
        <Swiper autoplay>
          {this.state.tops.map(top => {
            return (
              <SwiperItem>
                <View class="swiper-container">
                  <image class="swiper-img" src={top.image} mode="aspectFit" />
                </View>
              </SwiperItem>
            )
          })}
        </Swiper>
        {this.state.goods.map(good => {
          return (
            <AtCard title={good.title} thumb={good.image}>
              {good.summary}
            </AtCard>
          )
        })}
      </View>
    )
  }
}
