class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :lists
  has_many :votes
  has_many :favorites
  has_many :favorited_lists, through: :favorites, source: :list
  has_one :wall, class_name: "UserWall"

  validates_format_of :email, :with => Devise::email_regexp
  validates_uniqueness_of :username
  validates :username, length: { maximum: 20 }
  validates :username, presence: true
  validates :email, presence: true


  def format_json
    #formats for users_controller#show
    json = {}

    json.merge!(self.attributes)
    lists = self.lists.recent.map { |list| list.to_tree }
    favorited_lists = self.favorited_lists.recent.map { |list| list.to_tree }

    json["lists"] = lists
    json["karma"] = self.karma
    json["favoriteLists"] = favorited_lists

    json
  end

  def karma
    lists.inject(0) { |memo, list| memo + list.vote_count }
  end
  
end
