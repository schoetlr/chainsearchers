class List < ActiveRecord::Base
  belongs_to :user
  has_one :link
  has_many :list_taggings
  has_many :tags, through: :list_taggings
  has_many :votes

  scope :popular, -> { order("vote_count DESC") }

  def to_tree
    json = {}

    json.merge!(self.attributes)

    json["link"] = self.link ? self.link.to_node : {}

    json
  end
end
