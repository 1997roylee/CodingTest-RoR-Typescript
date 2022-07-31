# frozen_string_literal: true

Rails.application.routes.draw do
  root to: "home#landing"

  mount ActionCable.server => "/cable"

  get "home", to: "home#index"

  namespace :api, defaults: { format: :json } do
    resources :history, param: :version_id, only: [:index] do
      member do
        post :revert
      end
    end
    resources :todos, param: :todo_id, only: [:create, :update, :destroy]
    resources :todo_groups, param: :todo_group_id, only: [:create, :destroy] do
      member do
        post :reset
      end
    end
  end
end
