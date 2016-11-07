class ListTagging < ActiveRecord::Base
  belongs_to :list
  belongs_to :tag
end
