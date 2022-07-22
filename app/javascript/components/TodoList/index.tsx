import React, { useEffect } from "react";
import { Container, ListGroup, Form, Alert } from "react-bootstrap";
import { ResetButton } from "./uiComponent";
import axios, { AxiosResponse } from "axios";
import { CreateTodo } from "../CreateTodo";

type TodoItem = {
  id: number;
  title: string;
  checked: boolean;
};

type Props = {
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = (props) => {
  const [message, setMessage] = React.useState<null | string>(null)
  const [todoItems, setTodoItems] = React.useState<TodoItem[]>(props.todoItems)

  useEffect(() => {
    const token = document.querySelector(
      "[name=csrf-token]"
    ) as HTMLMetaElement;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = token.content;
  }, []);

  const checkBoxOnCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): Promise<void> => {
    try {
      const response = await axios.patch(`/todo_item/${todoItemId}`, {
        checked: e.target.checked,
      });
      if (response.status === 200) {
        const index = todoItems.findIndex((todoItem: TodoItem) => todoItem.id === todoItemId)
        todoItems[index].checked = !todoItems[index].checked
        setTodoItems([...todoItems])
        return;
      }
      setMessage("unknown error")
    } catch {
      setMessage("error")
    }
  };

  const handleCheck = (todoItemId: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => checkBoxOnCheck(e, todoItemId)
  }

  const switchAllItemsCheckedStatus = React.useCallback((checked: boolean) => {
    todoItems.forEach((todoItem: TodoItem) => todoItem.checked = checked)
    setTodoItems([...todoItems])
  }, [todoItems])

  const resetButtonOnClick = (): void => {
    axios.post("/reset").then(() => {
      setMessage("Reset Successfully")
      switchAllItemsCheckedStatus(false)

    }).catch(() => {
      setMessage("Cannot reset!")
    });
  };

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    axios.post("/bulk_edit", {
      checked: e.target.checked
    }).then(() => {
      switchAllItemsCheckedStatus(e.target.checked)
    }).catch(() => {
      setMessage("Cannot check all!")
    })
  }

  const handleCreateSuccess = (response: AxiosResponse<any, any>) => {
    todoItems.push(response.data.todo_item)
    setTodoItems([...todoItems])
  }

  return (
    <Container>
      <h3>2022 Wish List</h3>
      {
        message ? <Alert>{message}</Alert> : null
      }
      <CreateTodo onSuccess={handleCreateSuccess} />
      <ListGroup>
        {todoItems.map((todo) => (
          <ListGroup.Item key={todo.id}>
            <Form.Check
              type="checkbox"
              label={todo.title}
              checked={todo.checked}
              onChange={handleCheck(todo.id)}
            />
          </ListGroup.Item>
        ))}
        <Form.Check
          type="checkbox"
          label="check all"
          onChange={handleCheckAll}
        />
        <ResetButton onClick={resetButtonOnClick}>Reset</ResetButton>
      </ListGroup>
    </Container>
  );
};

export default TodoList;
