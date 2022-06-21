import React from "react";

export default class AddTodo extends React.Component {
  state = {
    value: ""
  };
  handlerChange = (e) => {
    this.setState({ value: e.target.value });
  };
  render() {
    const { handlerAddTodo } = this.props;
    return (
      <div>
        <input
          placeholder="add todo"
          value={this.state.value}
          onChange={this.handlerChange}
        />
        <button onClick={(_e) => handlerAddTodo(this.state.value)}>Add</button>
      </div>
    );
  }
}