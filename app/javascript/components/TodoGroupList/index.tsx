import React from 'react'
import { Container, Stack } from "react-bootstrap"
import { useTodoGroupStore, TodoGroupState } from '../../stores'
import TodoList from '../TodoList'

export const TodoGroupList = () => {
    const todoGroups: TodoGroup[] = useTodoGroupStore((state: TodoGroupState) => state.todoGroups)
    console.log(1234, todoGroups)
    return <Container><Stack gap={4}>
        {
            todoGroups && todoGroups.map((group: TodoGroup) => <div key={`Group_${group.id}`}>
                <TodoList id={group.id} name={group.name} todoItems={group.todos} />
            </div>)
        }
    </Stack>
    </Container>
}