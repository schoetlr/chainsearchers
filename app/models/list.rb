class List < ActiveRecord::Base
  belongs_to :user
  has_one :link
end
