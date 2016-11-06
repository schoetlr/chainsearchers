class Link < ActiveRecord::Base
  has_many :links
  belongs_to :link
  belongs_to :list
end
