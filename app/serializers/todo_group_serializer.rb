# frozen_string_literal: true

class TodoGroupSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :updated_at,
    :created_at

  has_many :todos
end
