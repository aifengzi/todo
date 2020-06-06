import Entity from './entity';

Page({
  data: {
    todos: [],
  },

  todo: '',

  onLoad() {
    const todos = Entity.getTodos();
    this.setData({ todos });
  },

  onInput({ detail: { value }}) {
    this.todo = value;
  },

  onAdd() {
    if (!Entity.checkValidInput(this.todo)) {
      Entity.showToast('您输入的事项为空');
      return;
    }

    this.setData(Entity.setTodos(this.todo));
  },
});
