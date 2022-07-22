# frozen_string_literal: true

class HomeController < ApplicationController
  before_action :set_todo_item, only: [:edit_todo_item]

  def landing
    @todos = Todo.all.order(:id)
  end

  ## post /todo_item
  ## post /todo_item.json
  def create_todo_item
    todo_item = Todo.create!(create_todo_item_params)
    render json: {
      success: true,
      todo_item: todo_item
    }
  end

  ## patch /bulk_edit_todo_items
  ## patch /bulk_edit_todo_items.json
  def bulk_edit_todo_items
    Todo.update_all(checked: bulk_edit_params[:checked])
    render json: {
      success: true
    }
  end

  ## patch /todo_item/:todo_item_id
  ## patch /todo_item/:todo_item_id.json
  def edit_todo_item
    @todo_item.update(todo_item_params)
    @todo_item.reload
    render json: {
      success: true,
      todo_item: @todo_item
    }
  end

  ## post /reset
  ## post /reset.json
  def reset_todo_items
    Todo.update_all(checked: false)
    render json: {
      success: true
    }
  end

  private

  def bulk_edit_params
    params.permit(:checked)
  end

  def create_todo_item_params
    params.permit(:title, :checked)
  end

  def todo_item_params
    params.permit(:id, :title, :checked)
  end

  def set_todo_item
    @todo_item = Todo.find(params[:todo_item_id])
  end
end
