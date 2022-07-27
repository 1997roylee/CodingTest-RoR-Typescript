# frozen_string_literal: true

class AddDefaultGroupItems < ActiveRecord::Migration[6.1]
  def up
    Todo.delete_all
    group_one = TodoGroup.create(name: "Group 1")
    group_one.todos.create(title: "Purpose")
    group_one.todos.create(title: "Peace", checked: true)
    group_one.todos.create(title: "Motivation")
    group_one.todos.create(title: "Health")
  end

  def down
    TodoGroup.destory_all
  end
end
