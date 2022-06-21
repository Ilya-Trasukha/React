import React from "react";
import TodoList from "../todo-list";
import AddTodo from "../add-todo";
import SearchTodo from "../search-todo";
import "./index";

const initialTodoList = [
  { id: 0, label: "Lern React", important: false, done: false, delete: false },
  { id: 1, label: "Lern JS", important: false, done: false, delete: false },
  { id: 2, label: "Lern HTML", important: false, done: false, delete: false },
  { id: 3, label: "Lern CSS", important: false, done: false, delete: false }
];

export default class Todo extends React.Component {
  state = {
    todoList: initialTodoList,
    term: ""
  };

  handlerImportant = (id) => {
    return (_e) => {
      const arr = this.state.todoList.map((el) => {
        if (el.id === id) {
          return { ...el, important: !el.important };
        } else {
          return el;
        }
      });
      this.setState({ ...this.state, todoList: arr });
    };
  };
  handlerAddTodo = (taskName) => {
    const idx = this.state.todoList.at(-1).id;
    this.setState((prevState) => ({
      ...prevState,
      todoList: [
        ...prevState.todoList,
        { id: idx + 1, label: taskName, important: false, done: false }
      ]
    }));
  };
  handlerDelete = (id) => {
    return (_e) => {
      const arr = this.state.todoList.filter((el) => {
        if (el.id === id) {
          return { ...el, delete: !el.delete };
        } else {
          return el;
        }
      });
      this.setState({ ...this.state, todoList: arr });
    };
  };
  handlerSearch = (e) => {
    this.setState({ ...this.state, term: e.target.value });
  };

  filterList = () => {
    if (this.state.term) {
      return this.state.todoList.filter((el) =>
        el.label.toLocaleLowerCase().includes(this.state.term)
      );
    }
    return this.state.todoList;
  };

  render() {
    const todos = this.filterList();
    console.log(todos);

    return (
      <div className="todo">
        <SearchTodo
          value={this.state.term}
          handlerChange={this.handlerSearch}
        />
        <TodoList todoList={todos} handlerImportant={this.handlerImportant} handlerDelete={this.handlerDelete} />
        <hr />
        <AddTodo handlerAddTodo={this.handlerAddTodo} />
      </div>
    );
  }
}