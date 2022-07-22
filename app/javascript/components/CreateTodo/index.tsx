import axios, { AxiosResponse } from 'axios';
import React from 'react'
import { Form, Button } from "react-bootstrap";

interface Props {
    onSuccess?: (value: AxiosResponse<any, any>) => void;
    onError?: (reason: any) => void;
}

export const CreateTodo = ({ onSuccess, onError }: Props) => {
    const [name, setName] = React.useState<string>("")

    const handleSubmit = (e) => {
        e.preventDefault()
        axios.post("/todo_item", {
            title: name,
            checked: true
        }).then(onSuccess).catch(onError)
    }
    const handleChange = (e) => {
        setName(e.target.value);
    }

    return <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>New todo item</Form.Label>
            <Form.Control placeholder="Enter todo item name" onChange={handleChange} />
        </Form.Group>
        <Button type='submit'>
            Create
        </Button>
    </Form>
}