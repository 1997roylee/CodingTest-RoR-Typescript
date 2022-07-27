# frozen_string_literal: true

module Api
  class TodoGroupsController < ApplicationController
    before_action :set_todo_group, only: [:reset, :destroy]
    ## post /api/todo_groups
    ## post /api/todo_groups.json
    def create
      todo_group = TodoGroup.create!(create_todo_group_params)
      broadcast(type: "NewTodoGroup", payload: todo_group, user_id: current_user_id)
      render(json: {
        todo_group: todo_group,
      })
    end

    ## post /api/todo_groups/:todo_group_id/reset
    ## post /api/todo_groups/:todo_group_id/reset.json
    def reset
      @todo_group.todos.update_all(checked: false)
      broadcast(type: "ResetTodoGroup", payload: @todo_group, user_id: current_user_id)
      render(json: {
        success: true,
      })
    end

    ## delete /api/todo_groups/:todo_group_id
    ## delete /api/todo_groups/:todo_group_id.json
    def destroy
      @todo_group.destroy!
      broadcast(type: "RemoveTodoGroup", payload: @todo_group, user_id: current_user_id)
      render(json: {
        success: true,
      })
    end

    private

    def set_todo_group
      @todo_group = TodoGroup.find(params[:todo_group_id])
    end

    def create_todo_group_params
      params.permit(:name)
    end
  end
end
