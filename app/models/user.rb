class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable, :confirmable

  # hook into the user create process when the id is available, create the user's wall with the user id
  after_commit(on: :create) { create_wall(self.id) }

  #set up associations
  has_many :lists
  has_many :votes
  has_many :favorites
  has_many :favorited_lists, through: :favorites, source: :list
  has_one :wall, class_name: "UserWall"

  #username validations
  validates_uniqueness_of :username
  validates :username, length: { maximum: 20 }
  validates :username, presence: true
  validates :username, exclusion: { in: ["anonymous"] }

  #email validations
  validates_format_of :email, :with => Devise::email_regexp
  validates_uniqueness_of :email
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
    json["wallLinks"] = self.wall.links

    json
  end

  def karma
    lists.inject(0) { |memo, list| memo + list.vote_count }
  end

  private

  def create_wall(user_id)
    puts "IT RAN"
    UserWall.create(user_id: user_id)
    return true
  end
  
end
