# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "home#landing"
  patch "todo_item/:todo_item_id", to: "home#edit_todo_item"
  post "todo_item", to: "home#create_todo_item"
  post "reset", to: "home#reset_todo_items"
  post "bulk_edit", to: "home#bulk_edit_todo_items"
end
