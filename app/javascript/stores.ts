import create, { useStore as _useStore } from 'zustand'
import produce from 'immer'

export interface TodoGroupState {
    todoGroups: TodoGroup[]
    setTodoGroups: (groups: TodoGroup[]) => void
    addTodoGroup: (group: TodoGroup) => void
    addTodo: (todo: TodoItem) => void
    removeTodoGroup: (id: number | string) => void
    removeTodo: (todoGroupId: number | string, id: number | string) => void
    patchTodo: (todo: TodoItem) => void
    resetTodoByGroup: (todoGroupId: number | string, timestamp: string) => void
}

export const createTodoGroupStore = (todoGroups: TodoGroup[]) => create<TodoGroupState>((set, get) => ({
    todoGroups,
    setTodoGroups: (groups: TodoGroup[]) => set(() => ({ todoGroups: groups })),
    addTodoGroup: (group: TodoGroup) =>
        set(
            produce((state) => {
                state.todoGroups.push(group);
            })
        ),
    removeTodoGroup: (id: number | string) =>
        set(
            produce((state) => {
                const index = state.todoGroups.findIndex((el) => el.id === id);
                state.todoGroups.splice(index, 1);
            })
        ),
    addTodo: (todo: TodoItem) => set(
        produce((state) => {
            const todoGroup: TodoGroup = state.todoGroups.find((el) => el.id === todo.todo_group_id);
            if (todoGroup.todos)
                todoGroup.todos.push(todo)
            else
                todoGroup.todos = [todo]
        })
    ),
    removeTodo: (todoGroupId: number | string, id: number | string) =>
        set(
            produce((state) => {
                const todoGroup: TodoGroup = state.todoGroups.find((el) => el.id === todoGroupId);
                const index = todoGroup.todos.findIndex((el) => el.id === id);
                todoGroup.todos.splice(index, 1);
            })
        ),
    patchTodo: (todo: TodoItem) => set(
        produce((state) => {
            const todoGroup: TodoGroup = state.todoGroups.find((el) => el.id === todo.todo_group_id);
            const _todo = todoGroup.todos.find((el) => el.id === todo.id)
            _todo.checked = todo.checked
            _todo.title = todo.title
            _todo.updated_at = todo.updated_at
        })
    ),
    resetTodoByGroup: (todoGroupId: number | string, timestamp: String) => set(
        produce((state) => {

            const todoGroup: TodoGroup = state.todoGroups.find((el) => el.id === todoGroupId);
            // console.log(timestamp, todoGroup.todos[0].updated_at)
            todoGroup.todos && todoGroup.todos.forEach(todo => {
                todo.checked = false
                todo.updated_at = timestamp
            })
        })
    ),
}))

export const useTodoGroupStore = createTodoGroupStore([])