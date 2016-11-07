class Tag < ActiveRecord::Base
  has_many :list_taggings

  has_many :lists, through: :list_taggings
end
