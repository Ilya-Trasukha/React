import React from "react";
import "./index.scss";

export default class TodoItem extends React.Component {
  static defaultProps = {
    item: { id: 0, label: "test", important: false, done: false },
    handlerImportant: () => {},
    handlerDelete: () => {},
    handlerDone: () => {}
  };
  render() {
    const { item, handlerImportant,handlerDelete, handlerDone } = this.props;

    return (
      <div className="todo-item" onClick={handlerImportant}>
        <div className={item.done ? 'done' : ''}>{item.label}</div>
        <div className="nav">
          {item.important && <div className="red" />}
          <div className="check" onClick={handlerDone}>
            ✓
          </div>
          <div className="remove" onClick={handlerDelete}>
          🗑
          </div>  
        </div>
      </div>
    );
  }
}
