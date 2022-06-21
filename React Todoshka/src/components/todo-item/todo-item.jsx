import React from "react";
import "./index.scss";

export default class TodoItem extends React.Component {
  static defaultProps = {
    item: { id: 0, label: "test", important: false, done: false },
    handlerImportant: () => {},
    handlerDelete: () => {},
  };
  render() {
    const { item, handlerImportant,handlerDelete } = this.props;

    return (
      <div className="todo-item" onClick={handlerImportant}>
        {item.label}
        <div className="nav">
          {item.important && <div className="red" />}
          <div
            className="check"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            ✓
          </div>
          <div onClick={handlerDelete}>
          <div className="remove"
            onClick={(e) => {
            e.stopPropagation();
          }} 
          >
          🗑
          </div>
          </div>
          
        </div>
      </div>
    );
  }
}
