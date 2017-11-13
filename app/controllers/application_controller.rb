class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  before_action :authenticate_user!
  protect_from_forgery with: :exception


  def after_sign_in_path_for(user)
    # respond_to do |format|
    #   byebug
    #   format.html { home_path }
    #   format.json { render json: current_resource_owner }
    # end
    home_path
  end

  private

  def current_user
   @current_user ||= User.find(doorkeeper_token.resource_owner_id) if doorkeeper_token
   
   #@current_user = User.where(username: "anonymous") if !@current_user
  end
end
