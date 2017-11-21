class Following < ActiveRecord::Base

  belongs_to :follower, foreign_key: :follower_id, class_name: "User"

  belongs_to :followed, foreign_key: :follwed_id, class_name: "User"
end
