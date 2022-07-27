# frozen_string_literal: true

class CreateTodoGroups < ActiveRecord::Migration[6.1]
  def change
    create_table(:todo_groups) do |t|
      t.string(:name, limit: 100, nil: false)
      t.integer(:order, default: 0)
      t.timestamps
    end
  end
end
