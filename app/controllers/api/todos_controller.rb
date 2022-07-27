# frozen_string_literal: true

module Api
  class TodosController < ApplicationController
    before_action :set_todo, only: [:update, :destroy]
    ## post /api/todos
    ## post /api/todos.json
    def create
      todo = Todo.create!(create_todo_params)
      broadcast(type: "NewTodo", payload: todo, user_id: current_user_id)
      render(json: {
        todo: todo,
      })
    end

    ## patch /api/todos/:todo_id
    ## patch /api/todos/:todo_id.json
    def update
      @todo.update!(update_todo_params)
      @todo.reload
      broadcast(type: "PatchTodo", payload: @todo, user_id: current_user_id)
      render(json: {
        todo: @todo,
      })
    end

    ## delete /api/todos/:todo_id
    ## delete /api/todos/:todo_id.json
    def destroy
      @todo.delete
      broadcast(type: "RemoveTodo", payload: @todo, user_id: current_user_id)
      render(json: {})
    end

    private

    def create_todo_params
      params.permit(:title, :checked, :todo_group_id)
    end

    def update_todo_params
      params.permit(:title, :checked)
    end

    def set_todo
      @todo = Todo.find(params[:todo_id])
    end
  end
end
