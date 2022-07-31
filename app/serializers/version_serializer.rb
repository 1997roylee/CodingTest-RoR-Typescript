# frozen_string_literal: true

class VersionSerializer < ActiveModel::Serializer
  attributes :id, :item_id, :item_type, :event, :new_object

  def new_object
    YAML.load(object.object) if object.object.present?
  end
end
