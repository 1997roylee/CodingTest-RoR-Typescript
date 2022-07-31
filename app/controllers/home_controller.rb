# frozen_string_literal: true

class HomeController < ApplicationController
  ## root
  def landing
    @todo_groups = TodoGroup.includes(:todos).all.order("todos.id").map do |todo_group|
      ::TodoGroupSerializer.new(todo_group).as_json
    end
  end

  ## get /home
  ## get /home.json
  def index
    todo_groups = TodoGroup.includes(:todos).all.order("todos.id").map do |todo_group|
      ::TodoGroupSerializer.new(todo_group).as_json
    end
    render_ok({
      todo_groups: todo_groups,
    })
  end
end
