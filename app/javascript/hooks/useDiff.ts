
import { useTodoGroupStore } from "../stores";
import { UserId } from "../utils/constants";

const { getState } = useTodoGroupStore

export const useDiff = (type: string, payload: any, userId: string) => {
    if (userId === UserId)
        return;

    let todoList = [], todo = undefined, todoGroup = undefined;
    const state = getState()

    switch (type) {
        case "Reload":
            state.reload()
            break
        case "NewTodo":
            todoList = state.todoGroups.reduce((result, todoGroup) => [...result, ...(todoGroup.todos || [])], [])
            todo = todoList.find((el) => el.id === payload.id)
            if (todo === undefined) {
                state.addTodo(payload)
            }
            break;
        case "PatchTodo":
            todoList = state.todoGroups.reduce((result, todoGroup) => [...result, ...(todoGroup.todos || [])], [])
            todo = todoList.find((el) => el.id === payload.id)
            if (todo.updated_at !== payload.updated_at)
                state.patchTodo(payload)

            break;
        case "RemoveTodo":
            todoList = state.todoGroups.reduce((result, todoGroup) => [...result, ...(todoGroup.todos || [])], [])
            todo = todoList.find((el) => el.id === payload.id)
            if (todo)
                state.removeTodo(payload.todo_group_id, payload.id)
            break;
        case "NewTodoGroup":
            todoGroup = state.todoGroups.find((el) => el.id === payload.id)
            if (todoGroup === undefined)
                state.addTodoGroup(payload)
            break;

        case "ResetTodoGroup":
            todoGroup = state.todoGroups.find((el) => el.id === payload.id)
            if (todoGroup.todos && todoGroup.todos.length) {
                state.resetTodoByGroup(todoGroup.id, payload.updated_at)
            }
            break;
        case "RemoveTodoGroup":
            todoGroup = state.todoGroups.find((el) => el.id === payload.id)
            if (todoGroup)
                state.removeTodoGroup(payload.id)
            break;
        default:

    }
}