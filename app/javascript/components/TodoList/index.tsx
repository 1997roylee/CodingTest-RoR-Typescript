import React from "react";
import Dropdown from 'react-bootstrap/Dropdown';
import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import axios, { AxiosResponse } from "axios";
import { CreateTodoModal } from "../Modal/CreateTodoModal";
import { ResetButton } from "./ResetButton";
import { RemoveButton } from './RemoveButton';
import { useModal } from "../../hooks/useModal";
import { TodoGroupState, useTodoGroupStore } from "../../stores";
import { Flex } from "../Flex";

type Props = {
  id: string | number
  name: string
  todoItems: TodoItem[];
};

const TodoList: React.FC<Props> = (props) => {
  const { isShow, showModal, hideModal } = useModal()
  // const [message, setMessage] = React.useState<null | string>(null)
  const removeTodoGroup = useTodoGroupStore((state: TodoGroupState) => state.removeTodoGroup);
  const removeTodo = useTodoGroupStore((state: TodoGroupState) => state.removeTodo);
  const patchTodo = useTodoGroupStore((state: TodoGroupState) => state.patchTodo);
  const resetTodoByGroup = useTodoGroupStore((state: TodoGroupState) => state.resetTodoByGroup);
  const todoItems = props.todoItems

  const checkBoxOnCheck = async (
    e: React.ChangeEvent<HTMLInputElement>,
    todoItemId: number
  ): Promise<void> => {
    try {
      const response = await axios.patch(`/api/todos/${todoItemId}`, {
        checked: e.target.checked,
      });
      if (response.status === 200) {
        patchTodo(response.data.todo)
        return;
      }
    } catch {
    }
  };

  const handleCheck = (todoItemId: number) => {
    return (e: React.ChangeEvent<HTMLInputElement>) => checkBoxOnCheck(e, todoItemId)
  }

  const handleDestroy = () => {
    axios.delete("/api/todo_groups/" + props.id).then(() => {
      removeTodoGroup(props.id);
    }).catch(() => {

    })
  }

  const onRemoveSuccess = (_id) => {
    removeTodo(props.id, _id)
  }

  const onResetSuccess = (response: AxiosResponse<any, any>) => {
    resetTodoByGroup(props.id, response.data.timestamp)
  }

  return <>
    <Flex><h2>{props.name}</h2><Dropdown>
      <Dropdown.Toggle>
        More
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item onClick={showModal}>Create a todo item</Dropdown.Item>
        <Dropdown.Item onClick={handleDestroy}>Delete this group</Dropdown.Item>

      </Dropdown.Menu>
    </Dropdown></Flex>


    <ListGroup>
      {todoItems && todoItems.map((todo) => (
        <ListGroup.Item key={todo.id} style={{ display: "flex", justifyContent: "space-between" }}>
          <Form.Check
            type="checkbox"
            label={todo.title}
            checked={todo.checked}
            onChange={handleCheck(todo.id)}
          />
          <RemoveButton id={todo.id} onSuccess={onRemoveSuccess} />
        </ListGroup.Item>
      ))}
      <ResetButton todoGroupId={props.id} onSuccess={onResetSuccess} />
    </ListGroup>
    <CreateTodoModal todoGroupId={props.id} show={isShow} onHide={hideModal} />
  </>
};

export default TodoList;
