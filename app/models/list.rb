class List < ActiveRecord::Base
  belongs_to :user
  has_one :link
  has_many :list_taggings
  has_many :tags, through: :list_taggings
  has_many :votes
  has_many :favorites

  

  def to_tree
    json = {}

    json.merge!(self.attributes)

    json["link"] = self.link ? self.link.to_node : {}
    json["votes"] = self.votes
    json["favorites"] = self.favorites

    json
  end


  def self.with_tags(tags)
    tags.map! { |tag| JSON.parse(tag) }

    self.all.select do |list|
      tags.all? do |tag|
        ListTagging.where(list_id: list.id, tag_id: tag["id"]).length > 0
      end
    end

  end

  def self.popular
    self.all
  end

end
