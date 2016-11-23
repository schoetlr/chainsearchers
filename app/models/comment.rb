class Comment < ActiveRecord::Base
  belongs_to :user
  belongs_to :commentable, polymorphic: true

  has_many :comments, as: :commentable


  def to_node
    json = {}

    json.merge!(self.attributes)
    json["comments"] = self.comments.map { |comment| comment.to_node }
    json["user"] = self.user

    json

  end
end
