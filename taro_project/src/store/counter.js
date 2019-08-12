import {
  observable
} from 'mobx'
let todoStore = observable({
  todoList: ['吃饭', '睡觉', '打豆豆'],
  addTodo(item) {
    this.todoList.push(item)
  }
})
export default todoStore
