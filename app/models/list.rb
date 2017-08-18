class List < ActiveRecord::Base
  belongs_to :user
  has_one :link
  has_many :list_taggings
  has_many :tags, through: :list_taggings
  has_many :votes
  has_many :favorites
  has_many :comments, as: :commentable

  validates :title, length: { maximum: 50 }
  validates :description, length: { maximum: 200 } 

  def tags=(tags)
    #if tags is nil assign an empty array
    tags = tags ? tags : []
    tags = Tag.create_tags(tags)
    
    super(tags)
  end 

  def to_tree
    json = {}

    json.merge!(self.attributes)

    json["link"] = self.link ? self.link.to_node : {}
    json["votes"] = self.votes
    json["favorites"] = self.favorites
    json["user"] = self.user
    json["comments"] = self.comments.map { |comment| comment.to_node }
    json["tags"] = self.tags

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
    #refactor this to return ActiveRecord Association Object
    #then can chain with_tags on popular
    self.recent.sort  { |a, b| b.vote_count - a.vote_count }
  end

  def self.popular_with_tags(tags)
    tags.map! { |tag| JSON.parse(tag) }

    popular
    .select do |list|
      tags.all? do |tag|
        ListTagging.where(list_id: list.id, tag_id: tag["id"]).length > 0
      end
    end
  end

  def self.recent
    order(created_at: :desc)
  end

  def self.recent_with_tags(tags)
    recent
    .with_tags(tags)
  end


  def vote_count
    upvotes = self.votes.to_a.count { |vote| vote.downvote == false}
    downvotes = self.votes.to_a.count { |vote| vote.downvote == true }

    upvotes - downvotes

  end

  def last_link
    Link.where(list_id: self.id).order(created_at: :desc)[0]
  end

end
