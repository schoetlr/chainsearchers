require 'spec_helper'
require 'rails_helper'



describe User do 

  user = User.create(username: "test", email: "test@email.com", password: "password", confirmed_at: Time.now, password_confirmation: "password")

  it "should not throw errow when calling .users_followed_by" do 
    expect{user.users_followed_by}.to_not raise_error
  end

  it "should not throw error when calling .following" do 
    expect{user.followed_users}.to_not raise_error
  end
end