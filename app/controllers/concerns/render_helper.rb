# frozen_string_literal: true

module RenderHelper
  extend ActiveSupport::Concern

  def render_ok(data = {}, status = :ok)
    render(json: {
      status: "ok",
    }.merge(data), status: status)
  end

  def render_errors(errors, status = 422)
    render(json: {
      status: "error",
      errors: errors,
    }, status: status)
  end
end
