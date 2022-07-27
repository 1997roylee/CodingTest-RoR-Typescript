# frozen_string_literal: true

class Todo < ApplicationRecord
  has_paper_trail
  belongs_to :todo_group

  validates :title, presence: true
end
