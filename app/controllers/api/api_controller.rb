class API::APIController < ApplicationController
  skip_filter :authenticate_user!


  private

  def resource_owner
   @resource_owner = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
   
   #@current_user = User.where(username: "anonymous") if !@current_user
  end

  

  def logged_in_user?
    !!request.headers["Authorization"]
  end

end