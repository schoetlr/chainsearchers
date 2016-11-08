class Vote < ActiveRecord::Base
  belongs_to :user
  belongs_to :list, counter_cache: true
end
