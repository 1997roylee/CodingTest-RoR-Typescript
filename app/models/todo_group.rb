# frozen_string_literal: true

class TodoGroup < ApplicationRecord
  has_paper_trail
  has_many :todos, dependent: :destroy

  validates :name, presence: true
end
