# frozen_string_literal: true

class AddColumnTodoGroupIdOnTodos < ActiveRecord::Migration[6.1]
  def change
    # add_column :todos, :todo_group_id, :integer, nil: false
    # add_index :todos, :todo_group_id
    add_reference(:todos, :todo_group)
  end
end
