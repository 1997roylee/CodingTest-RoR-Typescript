# frozen_string_literal: true

class Version < ApplicationRecord
  include PaperTrail::VersionConcern

  def revert!
    new_object = object_to_yaml
    if event == :update.to_s or event == :destroy.to_s
      if item_type == :Todo.to_s
        todo_group = TodoGroup.find_by(id: new_object[:todo_group_id])
        if todo_group.blank?
          version = Version.find_by(item_id: new_object[:todo_group_id], item_type: :TodoGroup.to_s)
          version.reify.save! if version.present?
        end
      end
      reify.save!
      delete
    else
      item.destroy
      delete
    end
  end

  private

  def object_to_yaml
    return YAML.load(object).deep_symbolize_keys if object.present?

    {}
  end
end
