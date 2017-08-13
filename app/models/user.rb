class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :lists
  has_many :votes
  has_many :favorites

  validates_uniqueness_of :username
  validates :username, length: { maximum: 20 }
  validates :username, presence: true
  validates :email, presence: true


  def format_json
    json = {}

    json.merge!(self.attributes)

    json["lists"] = self.lists.recent
    json["karma"] = self.karma

    json
  end

  def karma
    lists.inject(0) { |memo, list| memo + list.vote_count }
  end
  
end
