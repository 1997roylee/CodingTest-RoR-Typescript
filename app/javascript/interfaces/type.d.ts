type TodoItem = {
    id: number;
    title: string;
    checked: boolean;
    todo_group_id: number | string
    updated_at: any
};

type TodoGroup = {
    id: number;
    name: string;
    todos: TodoItem[]
    updated_at: any
}

type Version = {
    id: number;
    event: string;
    item_id: number;
    item_type: string;
    new_object: any
    created_at: Date
}