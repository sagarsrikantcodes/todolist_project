const Todo = require('../lib/todo');
const TodoList = require('../lib/todolist');

describe("TodoList", () => {
  let todo1;
  let todo2;
  let todo3;
  let list;

  beforeEach(() => {
    todo1 = new Todo("Buy milk");
    todo2 = new Todo("Clean room");
    todo3 = new Todo("Go to the gym");

    list = new TodoList("Today's Todos");
    list.add(todo1);
    list.add(todo2);
    list.add(todo3);
  });
  // your tests go here
  // 1. size - (Test Pass)
  test("todolist has a size of 3", () => {
    expect(list.size()).toBe(3);
  });

  // 2. toArray - (Test Pass)
  test("Verifying toArray method from TodoList class", () => {
    expect(list.toArray()).toEqual([todo1, todo2, todo3]);
  });

  // 3. first - (Test Pass)
  test("The first TodoList object contains the title 'Buy milk'", () => {
    expect(list.first()).toEqual(todo1);
  });

  // 4. last - (Test Pass)
  test("The last TodoList object contains the title 'Go to the gym'", () => {
    expect(list.last()).toEqual(todo3);
  });

  // 5. shift - (Test Pass)
  test("Verifying the shift method from TodoList object", () => {
    let list1 = [...list.todos];
    expect(list1.shift()).toEqual(todo1);
  });

  // 6. pop - (Test Pass)
  test("Verifying the pop method from TodoList object", () => {
    let list1 = [...list.todos];
    expect(list1.pop()).toEqual(todo3);
  });

  // 7. isDone - (Test Pass)
  test("Verifying the isDone method from TodoList object", () => {
    expect(list.isDone()).not.toBeTruthy();
  });

  // 8. add - (Test Pass) 
  test("Verifying the add method from TodoList object", () => {
    expect(() => list.add({name: "Sagar"})).toThrow(TypeError)
  });

  // 9. itemAt - (Test Pass)
  test("Verifying the itemAt method from TodoList object", () => {
    expect(() => list.itemAt(3)).toThrow(ReferenceError);
  });
  // 9.2 Test Pass
  test("Verifying the itemAt method from TodoList object", () => {
    expect(list.itemAt(2)).toEqual(todo3);
  });

  // 10. markDoneAt - (Test Pass)
  test("Verifying the markDoneAt method from TodoList object with ReferenceError", () => {
    expect(() => list.markDoneAt(3)).toThrow(ReferenceError);
  });

  // 10.2 Test Pass
  test("Verifying the markDoneAt method from TodoList object without ReferenceError", () => {
    list.markDoneAt(1);
    expect(list.itemAt(1).isDone()).toBeTruthy();
  });

  // 11. markUndoneAt Test Pass
  test("Verifying the markUndoneAt method from TodoList object with ReferenceError", () => {
    expect(() => list.markUndoneAt(3)).toThrow(ReferenceError);
  });

  // 11.2 markUndoneAt Test Pass
  test("Verifying the markUndoneAt method from TodoList object without ReferenceError", () => {
    list.markUndoneAt(1);
    expect(list.itemAt(1).isDone()).not.toBeTruthy();
  });

  // 12. markAllDone Test Pass
  test("Verifying the markAllDone method from TodoList object", () => {
    list.markAllDone();
    expect(list.isDone()).toBeTruthy();
  });

  // 13. removeAt Test Pass
  test("Verifiying the removeAt method from TodoList object with ReferenceError", ()  => {
    expect(() => list.removeAt(3)).toThrow(ReferenceError);
  });

  // 13.2 removeAt Test Pass
  test("Verifiying the removeAt method from TodoList object without ReferenceError" , () => {
    expect(list.removeAt(1)).toEqual([todo2]);
    expect(list.toArray()).toEqual([todo1, todo3]);
  });

  // 14. toString part 1 - Test Pass (Note: Don't add indentation as it introduces unnecessary spaces to the string)
      test('toString returns string representation of the list', () => {
      let string = `---- Today's Todos ----
[ ] Buy milk
[ ] Clean room
[ ] Go to the gym`;
  
      expect(list.toString()).toBe(string);
    });
    
  // 15. toString (part 2) - Test Pass
  test('toString returns string representation of the list', () => {
      let string = `---- Today's Todos ----
[X] Buy milk
[ ] Clean room
[ ] Go to the gym`;

      list.markDoneAt(0);
      expect(list.toString()).toBe(string);
    });

  // 16. toString (part 3) - Test Pass
  test('toString returns string representation of the list', () => {
      let string = `---- Today's Todos ----
[X] Buy milk
[X] Clean room
[X] Go to the gym`;

      list.markAllDone();
      expect(list.toString()).toBe(string);
    });

  // 17. forEach - Test Pass
  test("Verifying the forEach method iterates over the elements in list", () => {
   let result = [];
   list.forEach(todo => result.push(todo));
   expect(result).toEqual([todo1, todo2, todo3]);
  });

  // 18. filter - Test Pass
  test("Verifiying the filter method iterates over the elements in list", () => {
    let callBackFn = function(todo) {
      if (todo.title === "Buy milk") {
        return todo;
      }
    };  

    expect(list.filter(callBackFn)).toEqual({"title": "Today's Todos", "todos": [{"done": false, "title": "Buy milk"}]});
  });
});

