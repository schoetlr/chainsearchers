require 'rails_helper'

RSpec.describe Following, type: :model do
  
  following = Following.create(follower_id: 1, followed_id: 2)

  it "does not throw error when calling .follower" do 
    expect{following.follower}.to_not raise_error
  end

  it "does not throw error when calling .followed" do 
    expect{following.followed}.to_not raise_error
  end
end
