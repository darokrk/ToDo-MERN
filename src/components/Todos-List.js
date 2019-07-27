import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Todo extends Component {
  state = {};

  handleRemove = () => {
    const url = `http://localhost:4000/todos/remove/${this.props.todo._id}`;

    axios
      .delete(url)
      .then(res => {
        console.log(res.data);
        console.log("USUNIETY");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const {
      todo_completed,
      todo_description,
      todo_responsible,
      todo_priority
    } = this.props.todo;
    return (
      <tr>
        <td className={todo_completed ? "completed" : ""}>
          {todo_description}
        </td>
        <td className={todo_completed ? "completed" : ""}>
          {todo_responsible}
        </td>
        <td className={todo_completed ? "completed" : ""}>{todo_priority}</td>
        <td>
          <Link to={"/edit/" + this.props.todo._id}>Edit</Link>
        </td>
        <td>
          <button onClick={this.handleRemove}>x</button>
        </td>
      </tr>
    );
  }
}

export default class TodosList extends Component {
  state = {
    todos: []
  };
  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentDidUpdate() {
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  todoList = () => {
    return this.state.todos.map((currentTodo, i) => (
      <Todo todo={currentTodo} key={i} />
    ));
  };

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
