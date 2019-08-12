import Taro, { Component } from '@tarojs/taro'
import { View, Text, Input, Button } from '@tarojs/components'
import { AtButton, AtInput, AtList, AtListItem } from 'taro-ui'
import './index.scss'
import { observer, inject } from '@tarojs/mobx'

@inject('todoStore')
@observer
export default class Index extends Component {
  config = {
    navigationBarTitleText: '首页'
  }

  constructor(props) {
    super(props)
    this.state = {
      title: '开课吧！',
      val: ''
    }
  }
  handleInput = val => {
    this.setState({
      val: val
    })
  }
  handleClick = () => {
    this.props.todoStore.addTodo(this.state.val)
    this.setState({
      val: ''
    })
  }
  render() {
    const { todoStore } = this.props
    return (
      <View className="index">
        <View>{this.state.title}</View>
        <AtInput value={this.state.val} onChange={this.handleInput} />
        <AtList>
          {todoStore.todoList.map(v => {
            return <AtListItem title={v} />
          })}
        </AtList>
        <AtButton type="primary" onClick={this.handleClick}>
          添加
        </AtButton>
      </View>
    )
  }
}
