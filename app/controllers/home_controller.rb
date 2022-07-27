# frozen_string_literal: true

class HomeController < ApplicationController
  def landing
    @todo_groups = TodoGroup.includes(:todos).all.order("todos.id").map do |todo_group|
      ::TodoGroupSerializer.new(todo_group).as_json
    end
    @todos = []
  end
end
