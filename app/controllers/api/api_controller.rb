class API::APIController < ApplicationController
  skip_filter :authenticate_user!
  before_action :set_headers

  private

  def resource_owner
   @resource_owner = User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
   
   #@current_user = User.where(username: "anonymous") if !@current_user
  end

  

  def logged_in_user?
    !!request.headers["Authorization"]
  end

  def set_headers
    headers['Access-Control-Allow-Origin'] = '*'
    headers['Access-Control-Allow-Methods'] = 'POST, PUT, DELETE, GET, OPTIONS'
    headers['Access-Control-Request-Method'] = '*'
    headers['Access-Control-Allow-Headers'] = 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  end

end