class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :lists
  has_many :votes
  has_many :favorites


  def format_json
    json = {}

    json.merge!(self.attributes)

    json["lists"] = self.lists

    json
  end
  
end
