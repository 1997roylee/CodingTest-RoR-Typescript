import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios, { AxiosResponse } from 'axios'
import { TodoGroupState, useTodoGroupStore } from '../../stores';

interface Props {
    show?: boolean
    onHide?: () => void
    todoGroupId: string | number
}

export const CreateTodoModal = (props: Props) => {

    const [value, setValue] = useState('')
    const addTodo = useTodoGroupStore((state: TodoGroupState) => state.addTodo);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleSubmit = () => {
        axios.post("/api/todos", {
            todo_group_id: props.todoGroupId,
            title: value
        }).then((response: AxiosResponse<any, any>) => {
            console.log('success', response)
            addTodo(response.data.todo)
            setValue('')
            props.onHide();
        }).catch((error) => {
            console.warn(error);
        })

    }

    return <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
                Modal heading
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Todo Item Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Todo Item Name" value={value} onChange={handleChange} />
                {/* <Form.Text className="text-muted">
                We'll never share your email with anyone else.
            </Form.Text> */}
            </Form.Group>

        </Modal.Body>
        <Modal.Footer>
            <Button variant="light" onClick={props.onHide}>Close</Button>
            <Button onClick={handleSubmit}>Submit</Button>
        </Modal.Footer>
    </Modal>
}