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
      render(json: {})
    end

    private

    def set_version
      @version = Version.find(params[:version_id])
    end
  end
end
