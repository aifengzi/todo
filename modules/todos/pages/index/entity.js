import Vendor from './../../vendor';

export default class Entity {
  static TodosKey = 'todos';

  static getTodos() {
    try {
      const todos = Vendor.Platform.getStorageSync(Entity.TodosKey);

      return (todos || []);
    } catch (_) {
      return [];
    }
  }

  static setTodos(todoName) {
    const todos = Entity.getTodos();
    todos.unshift({
      name: todoName,
      time: Entity.formatTime(),
    });

    Vendor.Platform.setStorageSync(Entity.TodosKey, todos);

    return { todos };
  }

  static formatTime(date, withTime = false, withSeconds = false, join = '-') {
    const DATE = date ? new Date(date) : new Date();
    // 为兼容ios，android平台的差异，故而不使用toLocaleDateString方法
    const year = DATE.getFullYear();
    const month = DATE.getMonth() + 1;
    const day = DATE.getDate();
    const time = DATE.toTimeString().slice(0, 8);
    let dateStr = year + join + month + join + day;
  
    if (!withTime) {
      return dateStr.replace(/\b\d\b/g, '0$&');
    }
  
    dateStr = `${dateStr} ${time}`.replace(/\b\d\b/g, '0$&');
  
    if (!withSeconds) {
      dateStr = dateStr.slice(0, -3);
    }
  
    return dateStr;    
  }

  static checkValidInput(input) {
    if (!input) {
      return false;
    }

    if (!input.trim()) {
      return false;
    }

    return true;
  }

  static showToast(title) {
    Vendor.Platform.showToast({
      title,
      mask: true,
      icon: 'none',
    });
  }
}