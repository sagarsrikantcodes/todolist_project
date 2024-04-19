const Todo = require('./todo.js');

class TodoList {
  constructor(title) {
    this.title = title;
    this.todos = [];
  }

  add(todoObject) {
    if (todoObject instanceof Todo) {
      this.todos.push(todoObject);
    } else {
      throw new TypeError("It is not a Todo object");
    }
  }

  size() {
    return this.todos.length;
  }

  first() {
    return this.todos ? this.todos[0] : undefined;
  }

  last() {
    return this.todos ? this.todos[this.todos.length - 1] : undefined;
  }

  itemAt(index) {
     if (!(this.raiseReferenceError(index))) {
      return this.todos[index];
     }
  }

  markDoneAt(index) {
    if (!(this.raiseReferenceError(index))) {
      let todoObject = this.todos.at(index);
      todoObject.markDone();
    }
  }

  markUndoneAt(index) {
    if (!(this.raiseReferenceError(index))) {
      let todoObject = this.todos.at(index);
      todoObject.markUndone();
    }
  }

  raiseReferenceError(index) {
    if (typeof index !== "number" || index >= this.todos.length || index === undefined) {
      throw new ReferenceError(`invalid index: ${index}`);
    }
  }

  isDone() {
    return this.todos.every(todo => todo.done === true);
  }

  shift() {
    return this.todos.shift();
  }

  pop() {
    return this.todos.pop();
  }

  removeAt(index) {
    if (!(this.raiseReferenceError(index))) {
      return this.todos.splice(index, 1);
    }
  }

  toString() {
    let res = `--- ${this.title} ---\n`;
    this.todos.forEach(todo => {
      res += `${todo.toString()}\n`
    });
    return res;
  }

  forEach(callBackFn) {
    this.todos.forEach(todo => {
      callBackFn(todo);
    });
  }

  filter(callBackFn) {
    return this.todos.filter(todo => callBackFn(todo));
  }

  findByTitle(title) {
    // let filteredArr = this.todos.filter(todo => todo.title === title);
    let filteredArr = this.filter(obj => obj["title"] === title);
    return filteredArr ? filteredArr[0] : undefined;
  }

  allDone() {
    let filteredArr = this.filter(obj => obj.isDone());
    /*
    let newObj = Object.assign({}, this);
    newObj["todos"] = filteredArr;
    return newObj;
    */
    return filteredArr;
  }

  allNotDone() {
    let filteredArr = this.filter(obj => obj.isDone() === false);
    /*
    let newObj = Object.assign({}, this);
    newObj["todos"] = filteredArr;
    return newObj;
    */
    return filteredArr;
  }

  markDone(title) {
    let todoObject = this.findByTitle(title);
    if (todoObject) {
      todoObject.markDone();
    }
  }

  markAllDone() {
    let callBackFn = todoObject => todoObject.markDone();
    this.forEach(callBackFn);
  }

  markAllUndone() {
    let callBackFn = todoObject => todoObject.markUndone();
    this.forEach(callBackFn);
  }

  toArray() {
    return this.todos.slice();
  }
}

module.exports = TodoList;










