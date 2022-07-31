# frozen_string_literal: true

module Api
  class HistoryController < ApplicationController
    before_action :set_version, only: [:revert]
    ## get /api/history
    ## get /api/history.json
    def index
      render(json: {
        history: Version.order(id: :desc).map { |version| VersionSerializer.new(version).as_json },
      })
    end

    ## post /api/history/:version_id/revert
    ## post /api/history/:version_id/revert.json
    def revert
      @version.revert!
      todo_groups = TodoGroup.includes(:todos).all.order("todos.id").map do |todo_group|
        ::TodoGroupSerializer.new(todo_group).as_json
      end
      broadcast(type: "Reload", payload: nil, user_id: current_user_id)
      render_ok({})
    rescue ActiveRecord::RecordNotUnique
      render_errors(nil)
    end

    private

    def set_version
      @version = Version.find(params[:version_id])
    end
  end
end
