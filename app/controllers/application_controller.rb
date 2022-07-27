# frozen_string_literal: true

class ApplicationController < ActionController::Base
  helper_method :broadcast
  helper_method :current_user_id

  protected

  def current_user_id
    request.headers["X-USER-ID"]
  end

  def broadcast(type:, payload:, user_id:)
    ActionCable.server.broadcast("todo_messages", {
      type: type,
      payload: payload,
      user_id: user_id,
    })
  end
end
