# frozen_string_literal: true

class Todo < ApplicationRecord
  has_paper_trail
  belongs_to :todo_group

  after_create :update_version_object

  validates :title, presence: true

  def update_version_object
    version = Version.find_by(item_id: id, item_type: :Todo, event: :create)
    version.update(object: YAML.dump(as_json)) if version.present?
  end
end
