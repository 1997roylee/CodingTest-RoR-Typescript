# frozen_string_literal: true

class TodoGroup < ApplicationRecord
  has_paper_trail
  has_many :todos, dependent: :destroy

  after_create :update_version_object

  validates :name, presence: true

  def update_version_object
    version = Version.find_by(item_id: id, item_type: :TodoGroup, event: :create)
    version.update(object: YAML.dump(as_json)) if version.present?
  end
end
